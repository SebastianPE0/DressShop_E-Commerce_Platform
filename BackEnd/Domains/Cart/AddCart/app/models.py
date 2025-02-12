from pydantic import BaseModel
from typing import List

class CartItem(BaseModel):
    product_id: str
    quantity: int

class Cart(BaseModel):
    cart_id: str  # Cambiado de user_id aq cart_id
    items: List[CartItem]
