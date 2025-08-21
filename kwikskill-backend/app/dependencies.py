# app/dependencies.py
from fastapi import Depends, HTTPException, Header
from firebase_admin import auth
from sqlalchemy.orm import Session
from app.database import get_db
from app import models

async def get_current_user(
    db: Session = Depends(get_db),
    authorization: str = Header(None)
) -> models.User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")

    try:
        token = authorization.split(" ")[1]
        decoded_token = auth.verify_id_token(token)
        user_id = decoded_token['uid']

        # Try to find existing user
        user = db.query(models.User).filter(models.User.id == user_id).first()
        
        # Auto-create user if they don't exist
        if not user:
            print(f"Creating new user with ID: {user_id}")  # Debug log
            user = models.User(
                id=user_id,
                email=decoded_token.get('email'),
                name=decoded_token.get('name', '')
            )
            db.add(user)
            try:
                db.commit()
                db.refresh(user)
            except Exception as e:
                db.rollback()
                print(f"Database error: {str(e)}")  # Debug log
                raise HTTPException(status_code=500, detail="Failed to create user")

        return user

    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        print(f"Authentication error: {str(e)}")  # Debug log
        raise HTTPException(status_code=401, detail=str(e))
