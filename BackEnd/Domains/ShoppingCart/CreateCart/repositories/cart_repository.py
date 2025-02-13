from config.database import carts_collection
from datetime import datetime

async def create_cart():
    cart = {
        "products": [],
        "created_at": datetime.utcnow()
    }
    result = await carts_collection.insert_one(cart)
    return str(result.inserted_id)
