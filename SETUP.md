# 📖 Complete Setup Instructions

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Methods](#installation-methods)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required Software
- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **MongoDB**: Version 7.0 or higher ([Download](https://www.mongodb.com/try/download/community))
- **Git**: Latest version ([Download](https://git-scm.com/downloads))

### Optional (for Docker)
- **Docker Desktop**: Latest version ([Download](https://www.docker.com/products/docker-desktop))

### System Specifications
- **RAM**: Minimum 4GB (8GB recommended)
- **Disk Space**: At least 2GB free
- **OS**: Windows 10/11, macOS, or Linux

---

## Installation Methods

### Method 1: Docker Setup (Easiest) ⭐

**Step 1:** Install Docker Desktop
- Download and install Docker Desktop for your OS
- Start Docker Desktop and wait for it to initialize

**Step 2:** Clone and Run
```bash
# Clone repository
git clone <your-repo-url>
cd Project

# Start all services
docker-compose up
```

**Step 3:** Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

**Step 4:** Seed Database (Optional)
```bash
# In a new terminal
docker exec -it sweetshop-backend npm run seed
```

---

### Method 2: Manual Setup

#### Prerequisites Installation

**Windows:**
```powershell
# Install Node.js from https://nodejs.org/
# Install MongoDB from https://www.mongodb.com/try/download/community
# Or use Chocolatey
choco install nodejs mongodb
```

**macOS:**
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and MongoDB
brew install node mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

#### Application Setup

**Step 1:** Clone Repository
```bash
git clone <your-repo-url>
cd Project
```

**Step 2:** Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Windows: notepad .env
# macOS/Linux: nano .env
```

**Backend .env Configuration:**
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_very_secure_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**Step 3:** Setup Frontend
```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Frontend .env Configuration:**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Database Setup

### Start MongoDB

**Windows:**
```powershell
# If installed as service
net start MongoDB

# If manual installation
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

**macOS:**
```bash
# Start MongoDB service
brew services start mongodb-community

# Or run manually
mongod --config /usr/local/etc/mongod.conf
```

**Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable on boot
sudo systemctl enable mongod
```

### Verify MongoDB is Running
```bash
# Connect to MongoDB
mongosh

# You should see MongoDB shell
# Exit with: exit
```

### Seed Database with Sample Data
```bash
cd backend
npm run seed
```

This will create:
- **Admin User**
  - Email: admin@sweetshop.com
  - Password: admin123
  
- **Regular User**
  - Email: user@sweetshop.com
  - Password: user123

- **15 Sample Sweets** across all categories

---

## Running the Application

### Using Docker

```bash
# Development mode (with hot reload)
docker-compose -f docker-compose.dev.yml up

# Production mode
docker-compose up

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

### Manual Mode

**Terminal 1 - Backend:**
```bash
cd backend

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend

# Development mode
npm start

# Build for production
npm run build
```

**Terminal 3 - MongoDB:**
```bash
# If not running as service
mongod
```

---

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run with coverage report
npm test -- --coverage

# Run in watch mode (auto-rerun on changes)
npm run test:watch

# Run specific test file
npm test -- tests/auth.test.js
```

### Manual API Testing

**Using curl (PowerShell):**
```powershell
# Register user
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"email":"test@test.com","password":"test123"}'

# Get all sweets
curl http://localhost:5000/api/sweets
```

**Using Postman:**
1. Import the API endpoints
2. Set base URL: http://localhost:5000/api
3. Test authentication and sweet operations

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution (Windows):**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Solution (macOS/Linux):**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

#### 2. MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Verify MongoDB is running:
   ```bash
   mongosh
   ```

2. Check MongoDB status:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongod
   
   # Windows
   net start MongoDB
   ```

3. Try different connection string:
   ```bash
   MONGODB_URI=mongodb://127.0.0.1:27017/sweetshop
   ```

#### 3. npm install Fails

**Error:** Various npm installation errors

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Use different registry:
   ```bash
   npm install --registry https://registry.npmjs.org
   ```

#### 4. Docker Issues

**Error:** Docker containers won't start

**Solutions:**
1. Restart Docker Desktop

2. Remove all containers and volumes:
   ```bash
   docker-compose down -v
   docker system prune -a
   ```

3. Rebuild images:
   ```bash
   docker-compose build --no-cache
   docker-compose up
   ```

#### 5. Frontend Not Loading

**Error:** White screen or "Cannot GET /"

**Solutions:**
1. Clear browser cache
2. Check if backend is running
3. Verify .env file exists in frontend
4. Check browser console for errors

#### 6. Authentication Not Working

**Error:** Token expired or invalid

**Solutions:**
1. Clear browser localStorage:
   ```javascript
   // Open browser console (F12)
   localStorage.clear()
   ```

2. Check JWT_SECRET in backend .env

3. Re-login to get new token

---

## Development Tips

### Hot Reload
Both frontend and backend support hot reload in development mode:
- Frontend: Automatic reload on file changes
- Backend: Using nodemon for auto-restart

### Database Management

**View all sweets:**
```bash
mongosh
use sweetshop
db.sweets.find().pretty()
```

**View all users:**
```bash
db.users.find().pretty()
```

**Clear all data:**
```bash
db.sweets.deleteMany({})
db.users.deleteMany({})
```

**Re-seed database:**
```bash
cd backend
npm run seed
```

### Logs

**Backend logs:**
- Terminal output shows all requests
- Console.log statements visible in terminal

**Frontend logs:**
- Browser console (F12)
- Network tab for API calls

**Docker logs:**
```bash
# View all logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

---

## Production Deployment

### Environment Setup
1. Set NODE_ENV=production
2. Use strong JWT_SECRET
3. Configure CORS properly
4. Use environment-specific MongoDB URI
5. Enable MongoDB authentication

### Build Commands
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### Docker Production
```bash
docker-compose -f docker-compose.yml up -d
```

---

## Next Steps

✅ **Verify Installation**: All services running
✅ **Seed Database**: Sample data loaded
✅ **Test API**: Endpoints responding
✅ **Access Frontend**: UI loads correctly
✅ **Login**: Authentication working
✅ **Test Features**: CRUD operations functional

**Ready to develop!** 🚀

For more information, see [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)
