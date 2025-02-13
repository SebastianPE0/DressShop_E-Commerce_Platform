from fastapi import APIRouter
from controllers.cart_controller import cart_router

router = APIRouter()
router.include_router(cart_router)
