import strawberry
import httpx
import os
from app.models import Cart, CartItem
from app.database import cart_collection
from strawberry.exceptions import GraphQLError

PRODUCT_SERVICE_URL = os.getenv("PRODUCT_SERVICE_URL")

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def add_to_cart(self, cart_id: str, product_id: str, quantity: int) -> Cart:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{PRODUCT_SERVICE_URL}/products/{product_id}")

        if response.status_code != 200:
            raise GraphQLError("❌ Producto no encontrado")

        product_data = response.json()

        if product_data["stock"] < quantity:
            raise GraphQLError("❌ No hay suficiente stock disponible")

        cart = await cart_collection.find_one({"cart_id": cart_id})

        if cart:
            for item in cart["items"]:
                if item["product_id"] == product_id:
                    item["quantity"] += quantity
                    break
            else:
                cart["items"].append({"product_id": product_id, "quantity": quantity})

            await cart_collection.update_one({"cart_id": cart_id}, {"$set": {"items": cart["items"]}})
        else:
            cart = {"cart_id": cart_id, "items": [{"product_id": product_id, "quantity": quantity}]}
            await cart_collection.insert_one(cart)

        return Cart(cart_id=cart_id, items=[CartItem(**item) for item in cart["items"]])

    @strawberry.mutation
    async def remove_from_cart(self, cart_id: str, product_id: str) -> Cart:
        cart = await cart_collection.find_one({"cart_id": cart_id})

        if not cart:
            raise GraphQLError("❌ Carrito no encontrado")

        cart["items"] = [item for item in cart["items"] if item["product_id"] != product_id]
        await cart_collection.update_one({"cart_id": cart_id}, {"$set": {"items": cart["items"]}})

        return Cart(cart_id=cart_id, items=[CartItem(**item) for item in cart["items"]])

    @strawberry.mutation
    async def clear_cart(self, cart_id: str) -> Cart:
        await cart_collection.update_one({"cart_id": cart_id}, {"$set": {"items": []}})
        return Cart(cart_id=cart_id, items=[])

schema = strawberry.Schema(mutation=Mutation)
