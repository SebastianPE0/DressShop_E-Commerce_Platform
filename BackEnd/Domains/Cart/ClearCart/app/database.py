import motor.motor_asyncio
from config.settings import MONGO_URI, DB_NAME

client = None

def get_database():
    global client
    if client is None:
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
    return client[DB_NAME]

database = get_database()
cart_collection = database["carts"]
