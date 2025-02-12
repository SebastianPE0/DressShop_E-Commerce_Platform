from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class Product(BaseModel):
    product_id: str
    name: str
    quantity: int
    price: float
    stock: int

class Cart(BaseModel):
    cart_id: Optional[str] = None
    products: List[Product] = []
    created_at: datetime
