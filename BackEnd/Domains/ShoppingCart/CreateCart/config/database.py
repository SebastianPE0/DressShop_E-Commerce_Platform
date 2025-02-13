from motor.motor_asyncio import AsyncIOMotorClient
import os
from config.settings import MONGO_URI

client = AsyncIOMotorClient(MONGO_URI)
db = client["cart_db"]
carts_collection = db["carts"]
