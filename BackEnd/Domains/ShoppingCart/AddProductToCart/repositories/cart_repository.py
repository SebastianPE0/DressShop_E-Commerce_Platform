import aiohttp
from config.database import carts_collection
from datetime import datetime
import uuid

GRAPHQL_GATEWAY_URL = "http://graphql-gateway/graphql"

async def get_product_details(product_id: str):
    """Consulta GraphQL-Gateway para obtener los detalles del producto."""
    query = """
    query GetProductById($productId: ID!) {
      getProductById(productId: $productId) {
        id
        name
        price
        stock
      }
    }
    """
    variables = {"productId": product_id}

    async with aiohttp.ClientSession() as session:
        async with session.post(
            GRAPHQL_GATEWAY_URL,
            json={"query": query, "variables": variables},
            headers={"Content-Type": "application/json"},
        ) as response:
            if response.status == 200:
                data = await response.json()
                return data.get("data", {}).get("getProductById", None)
            return None

async def add_product_to_cart(cart_id: str, product_id: str, quantity: int):
    """Agrega un producto al carrito obteniendo sus detalles desde GraphQL-Gateway."""
    if not cart_id:
        cart_id = str(uuid.uuid4())

    cart = await carts_collection.find_one({"cart_id": cart_id})

    # Obtener detalles del producto desde GraphQL-Gateway
    product_details = await get_product_details(product_id)
    if not product_details:
        return {"error": "Producto no encontrado"}

    price = product_details["price"]
    name = product_details["name"]
    stock = product_details["stock"]

    if quantity > stock:
        return {"error": "Stock insuficiente"}

    if not cart:
        cart = {
            "cart_id": cart_id,
            "products": [{"product_id": product_id, "name": name, "quantity": quantity, "price": price}],
            "created_at": datetime.utcnow()
        }
        await carts_collection.insert_one(cart)
    else:
        found = False
        for product in cart["products"]:
            if product["product_id"] == product_id:
                product["quantity"] += quantity
                found = True
                break

        if not found:
            cart["products"].append({"product_id": product_id, "name": name, "quantity": quantity, "price": price})

        await carts_collection.update_one({"cart_id": cart_id}, {"$set": {"products": cart["products"]}})

    return cart
