from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

try:
    print("Attempting to hash 'password123'...")
    hashed = pwd_context.hash("password123")
    print(f"Success! Hash: {hashed}")
    
    print("Attempting to verify...")
    valid = pwd_context.verify("password123", hashed)
    print(f"Verify result: {valid}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
