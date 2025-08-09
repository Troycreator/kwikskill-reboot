# app/dependencies.py
from fastapi import Request, HTTPException
from firebase_admin import auth

def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing token")
    token = auth_header.split(" ")[1]
    print("Received token:", token)  # Debugging
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print("Token verification error:", e)
        raise HTTPException(status_code=401, detail="Invalid token")
