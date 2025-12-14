# 🚀 Quick Start Guide

## Fastest Way to Run the Application

### Using Docker (Recommended - 2 commands)

```bash
# 1. Navigate to project directory
cd Project

# 2. Start everything with Docker Compose
docker-compose up
```

**That's it!** Access the app at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Manual Setup (Without Docker)

### Prerequisites
- Node.js 18+
- MongoDB running on localhost:27017

### Steps

```bash
# 1. Setup Backend
cd backend
npm install
cp .env.example .env
npm run dev

# 2. Open new terminal - Setup Frontend
cd frontend
npm install
cp .env.example .env
npm start
```

---

## Create Admin User

After starting the app, create an admin user:

```bash
# Using curl (Windows PowerShell)
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Admin","email":"admin@test.com","password":"admin123","role":"admin"}'

# Or use the registration form and manually change role to "admin" in the database
```

---

## Default Credentials (if needed)

Create your own users via registration form at http://localhost:3000/register

**Admin User:**
- Email: admin@test.com
- Password: admin123
- Role: admin

**Regular User:**
- Email: user@test.com  
- Password: user123
- Role: user

---

## What You Can Do

### As Regular User:
✅ Browse all sweets
✅ Search & filter by name, category, price
✅ Purchase sweets (decreases quantity)

### As Admin:
✅ All user features
✅ Add new sweets
✅ Edit existing sweets
✅ Delete sweets
✅ Restock inventory

---

## Testing the API

```bash
# Run backend tests
cd backend
npm test

# Test with coverage
npm test -- --coverage
```

---

## Stopping the Application

### Docker:
```bash
docker-compose down
```

### Manual:
Press `Ctrl+C` in both backend and frontend terminals

---

## Need Help?

Check the full [README.md](README.md) for detailed documentation.

---

**Happy Coding! 🍬**
