# app/services.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas
from app.database import get_db
from app.routers.auth import verify_token
from app.crud import service as crud_service

router = APIRouter(
    prefix="/services",
    tags=["Services"]
)

@router.post("/", response_model=schemas.Service)
async def create_service(
    service: schemas.ServiceCreate,
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Create a new service"""
    return crud_service.create_service(db, service, current_user.id)

@router.get("/provider", response_model=List[schemas.Service])
async def get_provider_services(
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Get services for current provider"""
    services = db.query(models.Service).filter(
        models.Service.provider_id == current_user.id
    ).all()
    return services

@router.get("/", response_model=List[schemas.Service])
async def list_services(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(verify_token)
):
    """List all services"""
    return crud_service.get_services(db)

@router.get("/{service_id}", response_model=schemas.Service)
def read(service_id: int, db: Session = Depends(get_db)):
    """Get a single service by ID"""
    service = crud_service.get_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.put("/{service_id}", response_model=schemas.Service)
def update(
    service_id: int, 
    service: schemas.ServiceCreate, 
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Update a service"""
    db_service = crud_service.get_service(db, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    if db_service.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this service")
    
    return crud_service.update_service(db, service_id, service)

@router.delete("/{service_id}")
def delete(
    service_id: int, 
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Delete a service"""
    db_service = crud_service.get_service(db, service_id)
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    if db_service.provider_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this service")
    
    crud_service.delete_service(db, service_id)
    return {"detail": "Service deleted"}
