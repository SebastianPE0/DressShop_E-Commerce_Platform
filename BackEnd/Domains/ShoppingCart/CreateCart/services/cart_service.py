from repositories.cart_repository import create_cart

async def handle_create_cart():
    cart_id = await create_cart()
    return {"cart_id": cart_id, "message": "Carrito creado exitosamente"}
