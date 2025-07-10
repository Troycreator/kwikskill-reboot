# app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from .database import Base

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    user_id = Column(String, index=True)