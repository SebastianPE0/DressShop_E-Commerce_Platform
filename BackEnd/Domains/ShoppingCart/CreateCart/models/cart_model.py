from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class Product(BaseModel):
    product_id: str
    quantity: int

class Cart(BaseModel):
    id: Optional[str] = None
    products: List[Product] = []
    created_at: datetime
