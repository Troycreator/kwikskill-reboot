from fastapi import APIRouter, Depends, HTTPException, Header
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials

router = APIRouter()

async def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")
    token = authorization.split(" ")[1]
    try:
        decoded = firebase_auth.verify_id_token(token)
        return decoded
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.get('/me')
async def me(user=Depends(verify_token)):
    return {"uid": user['uid'], "email": user.get('email')}

