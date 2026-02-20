"""
Seed script — run once to create a default user and sample lists/tasks.
Usage: python seed.py
"""
from database import SessionLocal, engine, Base
import models
from routers.auth import hash_password

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

def seed():
    # Clear existing data
    db.query(models.Task).delete()
    db.query(models.TaskList).delete()
    db.query(models.User).delete()
    db.commit()

    print("🌱 Seeding data...")

    # Create Test User
    test_user = models.User(
        name="Test User",
        email="test@example.com",
        hashed_password=hash_password("password123"),
        avatar_url="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
    )
    db.add(test_user)
    db.commit()
    db.refresh(test_user)

    print(f"✅ Created user: {test_user.email} (password: password123)")

    # Create Default List
    todo_list = models.TaskList(name="My Tasks", emoji="✅", owner_id=test_user.id)
    db.add(todo_list)
    db.commit()
    db.refresh(todo_list)

    print(f"✅ Created list: {todo_list.name}")
    print("🚀 Seeding complete!")

if __name__ == "__main__":
    seed()
    db.close()
