# KwikSkill Platform

## Setup Instructions

### Backend Setup
1. Create virtual environment:
```bash
cd kwikskill-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

2. Set up environment variables:
- Copy `.env.template` to `.env`
- Add your Firebase credentials
- Configure database URL

3. Run migrations:
```bash
alembic upgrade head
```

4. Start server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup
1. Install dependencies:
```bash
cd kwikskill-frontend
npm install
```

2. Set up environment variables:
- Copy `.env.template` to `.env`
- Add your Firebase configuration

3. Start development server:
```bash
npm run dev
```
