# app/schemas.py

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: int
    firebase_uid: Optional[str] = None
    display_name: Optional[str] = None
    is_provider: Optional[bool] = False

    class Config:
        orm_mode = True

class ServiceBase(BaseModel):
    title: str
    description: str
    price: float
    location: Optional[str] = None
    tags: Optional[str] = None

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    provider_id: int
    provider: Optional[User] = None  # nested provider info

    class Config:
        orm_mode = True

class BookingBase(BaseModel):
    service_id: int
    scheduled_at: datetime

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    customer_id: int
    status: str
    amount: float

    class Config:
        orm_mode = True
