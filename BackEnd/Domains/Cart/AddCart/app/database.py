import motor.motor_asyncio
from config.settings import MONGO_URI, DB_NAME

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
database = client[DB_NAME]
cart_collection = database["carts"]
