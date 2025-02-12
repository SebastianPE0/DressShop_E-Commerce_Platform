import os
from dotenv import load_dotenv

# Cargar variables desde .env
load_dotenv()

# Definir variables de entorno
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Validar que las variables estén definidas
if not MONGO_URI:
    raise ValueError("⚠️ ERROR: MONGO_URI no está definido en .env")
