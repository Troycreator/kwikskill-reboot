from sqlalchemy import Column, Integer, String, Text, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy import DateTime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True)
    display_name = Column(String, nullable=True)
    is_provider = Column(Boolean, default=False)

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    provider_id = Column(Integer, ForeignKey('users.id'))
    title = Column(String, index=True)
    description = Column(Text)
    price = Column(Float)
    location = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    provider = relationship('User')

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey('services.id'))
    customer_id = Column(Integer, ForeignKey('users.id'))
    scheduled_at = Column(DateTime)
    status = Column(String, default='pending')
    amount = Column(Float)