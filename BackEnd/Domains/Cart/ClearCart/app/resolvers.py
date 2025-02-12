import strawberry
from app.models import Cart
from app.database import cart_collection

@strawberry.type
class Mutation:
    @strawberry.mutation
    async def clear_cart(self, user_id: str) -> Cart:
        # Eliminar el carrito del usuario en MongoDB
        await cart_collection.delete_one({"user_id": user_id})

        return Cart(user_id=user_id, items=[])

schema = strawberry.Schema(mutation=Mutation)
