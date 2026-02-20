# BetterTasks

FastAPI + SQLite backend · React + Vite frontend

---

## Project Structure

```
To-do-web-app/
├── backend/          ← FastAPI backend
└── frontend/          ← React + Vite frontend
```

---

## Backend Setup

**Path:** `To-do-web-app/backend/`

```bash
# 1. Create & activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Seed the database (first time only)
python seed.py
#    Creates test account: test@example.com / password123

# 4. Start the server
uvicorn main:app --reload --port 8001
```

**API Docs:** http://localhost:8001/docs

---

## Frontend Setup

**Path:** `To-do-web-app/frontend/`

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

**App:** http://localhost:5173

> The frontend calls the backend at `http://localhost:8001/api` — make sure the backend is running first.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/users/{id}` | Get user by ID |
| GET | `/api/lists/?owner_id=` | Get lists for a user |
| POST | `/api/lists/` | Create list |
| DELETE | `/api/lists/{id}` | Delete list |
| GET | `/api/tasks/?list_id=` | Get tasks for a list |
| POST | `/api/tasks/` | Create task |
| PATCH | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Delete task |
| PATCH | `/api/tasks/finish-all/{list_id}` | Mark all tasks done |
