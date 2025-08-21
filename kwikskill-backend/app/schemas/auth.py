from pydantic import BaseModel, EmailStr

class UserAuth(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    uid: str
    email: str
    message: str