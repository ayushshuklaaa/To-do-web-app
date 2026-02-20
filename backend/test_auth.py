"""Quick test for the auth endpoints."""
import urllib.request
import urllib.error
import json

BASE = "http://localhost:8001/api"

def test_register():
    data = json.dumps({"name": "UI Test User", "email": "uitest@example.com", "password": "testpass123"}).encode()
    req = urllib.request.Request(f"{BASE}/auth/register", data=data, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            body = json.loads(resp.read())
            print(f"✅ Register: {resp.status} — {body}")
            return body
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"❌ Register: {e.code} — {body}")
        return None

def test_login(email, password):
    data = json.dumps({"email": email, "password": password}).encode()
    req = urllib.request.Request(f"{BASE}/auth/login", data=data, headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            body = json.loads(resp.read())
            print(f"✅ Login: {resp.status} — {body}")
            return body
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"❌ Login: {e.code} — {body}")
        return None

if __name__ == "__main__":
    print("--- Testing Register ---")
    user = test_register()

    print("\n--- Testing Login ---")
    test_login("uitest@example.com", "testpass123")

    print("\n--- Testing Login with seeded user ---")
    test_login("test@example.com", "password123")

    print("\n--- Testing Login with wrong password ---")
    test_login("test@example.com", "wrongpassword")
