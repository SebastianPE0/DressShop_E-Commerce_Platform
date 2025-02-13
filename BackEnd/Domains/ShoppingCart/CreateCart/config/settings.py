import os
from dotenv import load_dotenv

# Cargar variables desde .env (solo para MONGO_URI y SECRET_KEY)
load_dotenv()

# Variables generales (que sí dependen de .env)
MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")

# Configuración automática de AWS Cognito (NO requiere .env)
COGNITO_USER_POOL_ID = "us-east-1_JudMXeuR1"  # Ajustar si es necesario
COGNITO_REGION = "us-east-1"

# Construcción automática de URLs de Cognito
COGNITO_ISSUER = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}"
COGNITO_JWKS_URL = f"{COGNITO_ISSUER}/.well-known/jwks.json"

# Validar que las variables críticas están definidas
if not MONGO_URI or not SECRET_KEY:
    raise ValueError("❌ Faltan variables de entorno críticas en el archivo .env")
