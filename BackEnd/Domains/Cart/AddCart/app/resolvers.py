import strawberry
import requests
import os
from app.models import Cart, CartItem
from app.database import cart_collection

PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL")  # Agregar esto a `.env`

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def add_to_cart(self, user_id: str, product_id: str, quantity: int) -> Cart:
        # Validar que el producto existe en el Microservicio de Productos
        product_response = requests.get(f"{PRODUCT_SERVICE_URL}/products/{product_id}")

        if product_response.status_code != 200:
            raise ValueError("Producto no encontrado")

        product_data = product_response.json()

        # Verificar disponibilidad del stocks
        if product_data["stock"] < quantity:
            raise ValueError("No hay suficiente stock disponible")

        # Buscar si el usuario ya tiene un carrito
        cart = await cart_collection.find_one({"user_id": user_id})

        if cart:
            for item in cart["items"]:
                if item["product_id"] == product_id:
                    item["quantity"] += quantity
                    break
            else:
                cart["items"].append({"product_id": product_id, "quantity": quantity})

            await cart_collection.update_one({"user_id": user_id}, {"$set": {"items": cart["items"]}})
        else:
            cart = {"user_id": user_id, "items": [{"product_id": product_id, "quantity": quantity}]}
            await cart_collection.insert_one(cart)

        return Cart(user_id=user_id, items=[CartItem(**item) for item in cart["items"]])

schema = strawberry.Schema(mutation=Mutation)
