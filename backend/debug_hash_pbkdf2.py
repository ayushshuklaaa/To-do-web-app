from passlib.context import CryptContext

# Switch to pbkdf2_sha256
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

try:
    print("Attempting to hash 'password123' with pbkdf2_sha256...")
    hashed = pwd_context.hash("password123")
    print(f"Success! Hash: {hashed}")
    
    print("Attempting to verify...")
    valid = pwd_context.verify("password123", hashed)
    print(f"Verify result: {valid}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
