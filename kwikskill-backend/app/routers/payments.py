from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class SnapRequest(BaseModel):
    amount: float
    reference: str

@router.post('/snapqrcode')
async def create_snap_qr(req: SnapRequest):
    # Replace with real SnapScan integration using their merchant API
    # Here we return a data URL placeholder or an object with qr_code_url and payment_id
    return {"payment_id": "sample-12345", "qr_code_url": "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=kwikskill:" + req.reference}

@router.get('/status/{payment_id}')
async def payment_status(payment_id: str):
    # Polling endpoint for client to check payment status
    return {"payment_id": payment_id, "status": "pending"}