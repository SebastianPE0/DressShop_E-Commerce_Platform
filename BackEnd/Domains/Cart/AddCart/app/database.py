import motor.motor_asyncio
from config.settings import MONGO_URI, DB_NAME

class Database:
    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            cls._client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
        return cls._client

    @classmethod
    async def close_client(cls):
        if cls._client is not None:
            cls._client.close()
            cls._client = None

database = Database.get_client()[DB_NAME]
cart_collection = database["carts"]
