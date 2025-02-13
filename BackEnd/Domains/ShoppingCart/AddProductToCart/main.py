from fastapi import FastAPI
from routes.cart_routes import router
import uvicorn

app = FastAPI()
#TEST DEPLOY
# Incluir las rutas del carrito
app.include_router(router)

# Endpoint de verificación de estado
@app.get("/")
def health_check():
    return {"status": "running"}

if __name__ == "__main__":
    uvicorn.run(app, port=80)
