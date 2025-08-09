from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import schemas, models, database
from app.routers.auth import verify_token

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Booking)
async def create_booking(booking: schemas.BookingCreate, 
                         user=Depends(verify_token), 
                         db: Session = Depends(get_db)):
    
    db_user = db.query(models.User).filter(models.User.firebase_uid == user['uid']).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Fetch the service to get its price
    service = db.query(models.Service).filter(models.Service.id == booking.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    # Create booking record
    db_booking = models.Booking(
        service_id=booking.service_id,
        customer_id=db_user.id,
        scheduled_at=booking.scheduled_at,
        status="pending",
        amount=service.price
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/", response_model=List[schemas.Booking])
async def get_bookings(user=Depends(verify_token), db: Session = Depends(get_db)):
    # Fetch bookings where user is customer or provider
    # First, get user DB record
    db_user = db.query(models.User).filter(models.User.firebase_uid == user['uid']).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if db_user.is_provider:
        # Provider sees bookings for their services
        bookings = (
            db.query(models.Booking)
            .join(models.Service)
            .filter(models.Service.provider_id == db_user.id)
            .all()
        )
    else:
        # Customer sees their own bookings
        bookings = db.query(models.Booking).filter(models.Booking.customer_id == db_user.id).all()
    
    return bookings

@router.get("/{booking_id}", response_model=schemas.Booking)
async def get_booking(booking_id: int, user=Depends(verify_token), db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Check if user is involved
    db_user = db.query(models.User).filter(models.User.firebase_uid == user['uid']).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if booking.customer_id != db_user.id and booking.service.provider_id != db_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to view this booking")
    
    return booking

@router.put("/{booking_id}", response_model=schemas.Booking)
async def update_booking_status(booking_id: int, status: str, user=Depends(verify_token), db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    db_user = db.query(models.User).filter(models.User.firebase_uid == user['uid']).first()
    if not db_user or not db_user.is_provider:
        raise HTTPException(status_code=403, detail="Only providers can update bookings")
    
    # Provider must own the service
    if booking.service.provider_id != db_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this booking")
    
    booking.status = status
    db.commit()
    db.refresh(booking)
    return booking
