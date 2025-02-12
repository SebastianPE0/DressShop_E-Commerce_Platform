import jwt
from fastapi import HTTPException, Request, Depends
import os
from jwt import PyJWKClient

COGNITO_USER_POOL_ID = "us-east-1_JudMXeuR1"
COGNITO_REGION = "us-east-1"
COGNITO_ISSUER = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}"
COGNITO_JWKS_URL = f"{COGNITO_ISSUER}/.well-known/jwks.json"
COGNITO_CLIENT_ID = "92oh9nmejo0d5a5ga51il8u3o"  # Asegúrate de usar el correcto

ALGORITHM = "RS256"
jwks_client = PyJWKClient(COGNITO_JWKS_URL)

def get_public_key(header):
    signing_key = jwks_client.get_signing_key(header["kid"])
    return signing_key.key

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No token provided")

    token = auth_header.replace("Bearer ", "")

    try:
        header = jwt.get_unverified_header(token)
        public_key = get_public_key(header)

        decoded_token = jwt.decode(
            token, 
            public_key, 
            algorithms=[ALGORITHM], 
            issuer=COGNITO_ISSUER,
            options={"verify_aud": False}  # 🔥 Opción agregada para evitar error de `aud`
        )

        print("✅ Token decodificado correctamente:", decoded_token)
        return decoded_token

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
