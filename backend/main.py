from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import users, lists, tasks, auth

# Create all DB tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BetterTasks API",
    description="Backend API for the BetterTasks todo application",
    version="1.0.0"
)

# Allow requests from the Vite dev server (permissive for local dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(lists.router)
app.include_router(tasks.router)


@app.get("/")
def root():
    return {"message": "BetterTasks API is running 🚀"}
