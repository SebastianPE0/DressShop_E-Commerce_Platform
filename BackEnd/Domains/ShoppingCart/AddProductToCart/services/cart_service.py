from repositories.cart_repository import add_product_to_cart

async def handle_add_product_to_cart(cart_id: str, product_id: str, quantity: int):
    cart = await add_product_to_cart(cart_id, product_id, quantity)
    return {"message": "Producto agregado al carrito", "cart": cart}
