from pydantic import BaseModel, Field, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime
from decimal import Decimal
import re

# --- User ---
class UserBase(BaseModel):
    email: EmailStr
    display_name: Optional[str] = None
    is_provider: bool = False

class UserCreate(BaseModel):
    email: str
    name: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    
    class Config:
        orm_mode = True

class User(UserBase):
    id: int
    firebase_uid: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# --- Service ---
class ServiceBase(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    price: Decimal = Field(gt=0)
    category: str = Field(..., min_length=1)
    skills: str = Field(..., min_length=1)
    availability: Optional[str] = None

    @field_validator('title')
    def validate_title(cls, v):
        if len(v.strip()) < 3:
            raise ValueError('Title must be at least 3 characters long')
        return v.strip()

    @field_validator('description')
    def validate_description(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Description must be at least 10 characters long')
        return v.strip()

    @field_validator('category')
    def validate_category(cls, v):
        if not v.strip():
            raise ValueError('Category cannot be empty')
        return v.strip()

    @field_validator('skills')
    def validate_skills(cls, v):
        if not v.strip():
            raise ValueError('Skills cannot be empty')
        return v.strip()

class ServiceCreate(ServiceBase):
    pass

class Service(ServiceBase):
    id: int
    provider_id: str

    class Config:
        from_attributes = True

# --- Booking ---
class BookingBase(BaseModel):
    service_id: int
    scheduled_at: datetime
    notes: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    customer_id: int
    provider_id: int
    status: str = Field(pattern="^(pending|confirmed|completed|cancelled)$")  # Changed from regex to pattern
    amount: float
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True

# --- User Profile ---
class ProviderBase(BaseModel):
    user_id: str
    skills: str
    experience: str
    availability: Optional[str] = None
    service_description: Optional[str] = None
    hourly_rate: float
    is_active: bool = True

class ProviderCreate(BaseModel):
    skills: str
    experience: str
    hourly_rate: float
    availability: Optional[str] = None
    service_description: Optional[str] = None

class ProviderResponse(BaseModel):
    id: str
    user_id: str
    skills: str
    experience: str
    hourly_rate: float
    availability: Optional[str] = None
    service_description: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

# Update UserProfile to include provider information
class UserProfile(BaseModel):
    id: str
    email: str
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[str] = None

    class Config:
        from_attributes = True

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    skills: Optional[str] = None

    class Config:
        from_attributes = True
