from fastapi import APIRouter, Depends
from services.cart_service import handle_create_cart
from config.auth_middleware import verify_token

cart_router = APIRouter()

@cart_router.post("/cart/create")
async def create_cart(user: dict = Depends(verify_token)):  # Se requiere autenticación
    return await handle_create_cart()
