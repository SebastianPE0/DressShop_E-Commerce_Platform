from fastapi import APIRouter, Depends
from services.cart_service import handle_add_product_to_cart
from config.auth_middleware import verify_token

cart_router = APIRouter()

@cart_router.post("/cart/add")
async def add_product_to_cart(cart_id: str, product_id: str, quantity: int, user: dict = Depends(verify_token)):
    return await handle_add_product_to_cart(cart_id, product_id, quantity)
