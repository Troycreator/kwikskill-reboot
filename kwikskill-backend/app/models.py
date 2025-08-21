from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, Boolean, DateTime, Numeric
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True)
    name = Column(String)
    bio = Column(Text)
    location = Column(String)
    skills = Column(String)
    is_provider = Column(Boolean, default=False)
    provider = relationship("Provider", back_populates="user", uselist=False)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    category = Column(String, nullable=False)  # Added column
    skills = Column(String, nullable=False)    # Added column
    availability = Column(String)              # Added column
    provider_id = Column(String, ForeignKey("users.id"))

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey('services.id'))
    customer_id = Column(String, ForeignKey('users.id'))  # Changed to String
    scheduled_at = Column(DateTime)
    status = Column(String, default='pending')
    amount = Column(Float)

class Provider(Base):
    __tablename__ = "providers"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    skills = Column(String, nullable=False)
    experience = Column(String, nullable=False)
    hourly_rate = Column(Float, nullable=False)
    availability = Column(String, nullable=True)
    service_description = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="provider")