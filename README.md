# 🍬 Sweet Shop - Full Stack Application

A modern, full-stack sweet shop application built with React, Node.js, Express, and MongoDB. Features include user authentication, role-based access control, inventory management, and a beautiful responsive UI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## ✨ Features

### Frontend Features
- 🎨 Modern, responsive UI with smooth animations
- 🔐 User registration and login
- 🏪 Browse all available sweets
- 🔍 Search and filter sweets by name, category, and price
- 🛒 Purchase sweets with real-time quantity updates
- 👨‍💼 Admin panel for managing sweets
- 📱 Fully responsive (mobile + desktop)

### Backend Features
- 🔒 JWT-based authentication
- 👥 Role-based access control (User/Admin)
- 📦 RESTful API design
- 💾 MongoDB database integration
- ✅ Comprehensive API validation
- 🧪 Full test coverage with Jest
- 🚀 Docker containerization
- ⚙️ CI/CD with GitHub Actions

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Styling:** Custom CSS with modern gradients

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Testing:** Jest & Supertest

### DevOps
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions
- **Web Server:** Nginx (for production frontend)

## 📁 Project Structure

```
sweet-shop/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── sweetController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Sweet.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── sweetRoutes.js
│   │   └── server.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   └── sweets.test.js
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── SweetCard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Admin.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── sweetService.js
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── .github/
│   └── workflows/
│       ├── backend-ci.yml
│       └── frontend-ci.yml
├── docker-compose.yml
├── docker-compose.dev.yml
└── README.md
```

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v7.0 or higher)
- **Docker & Docker Compose** (optional, for containerized deployment)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd sweet-shop
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your configuration
# Example:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/sweetshop
# JWT_SECRET=your_secure_jwt_secret_here
# JWT_EXPIRE=7d
# NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Update .env with your configuration
# Example:
# REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Option 1: Manual Setup (Development)

#### Start MongoDB

```bash
# If you have MongoDB installed locally
mongod
```

#### Start Backend

```bash
cd backend
npm run dev
# Backend will run on http://localhost:5000
```

#### Start Frontend

```bash
cd frontend
npm start
# Frontend will run on http://localhost:3000
```

### Option 2: Using Docker (Recommended)

#### Development Mode

```bash
# Run all services (MongoDB + Backend + Frontend)
docker-compose -f docker-compose.dev.yml up

# Run in detached mode
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

#### Production Mode

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Remove volumes (clears database)
docker-compose down -v
```

### Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user", can be "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Sweet Endpoints

#### Get All Sweets
```http
GET /api/sweets
```

#### Search Sweets
```http
GET /api/sweets/search?name=gulab&category=traditional&minPrice=100&maxPrice=200
```

Query Parameters:
- `name` (optional): Search by sweet name
- `category` (optional): Filter by category (traditional, chocolate, cookies, cakes, candies, other)
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter

#### Get Single Sweet
```http
GET /api/sweets/:id
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Gulab Jamun",
  "description": "Sweet milk-solids-based dessert",
  "category": "traditional",
  "price": 150,
  "quantity": 100,
  "imageUrl": "https://example.com/image.jpg" // optional
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "price": 175,
  "quantity": 150
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <admin-token>
```

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 5
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "quantity": 50
}
```

### Categories
- `traditional`
- `chocolate`
- `cookies`
- `cakes`
- `candies`
- `other`

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
The backend includes comprehensive tests for:
- ✅ User registration and authentication
- ✅ Login functionality
- ✅ Sweet CRUD operations
- ✅ Role-based access control
- ✅ Purchase and restock operations
- ✅ Input validation
- ✅ Error handling

## 🔐 Environment Variables

### Backend (.env)

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sweetshop
JWT_SECRET=your_secure_jwt_secret_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)

```bash
REACT_APP_API_URL=http://localhost:5000/api
```

## 👥 User Roles

### Regular User
- Register and login
- Browse all sweets
- Search and filter sweets
- Purchase sweets

### Admin User
- All user permissions
- Create new sweets
- Update existing sweets
- Delete sweets
- Restock inventory

### Creating an Admin User

To create an admin user, register with `role: "admin"`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

## 🐳 Docker Commands

```bash
# Build images
docker-compose build

# Start services
docker-compose up

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Access backend container
docker exec -it sweetshop-backend sh

# Access MongoDB
docker exec -it sweetshop-mongodb mongosh

# Remove all containers and volumes
docker-compose down -v
```

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows for:

### Backend CI
- ✅ Automated testing on Node.js 18.x and 20.x
- ✅ MongoDB service integration
- ✅ Code coverage reporting
- ✅ Docker image building
- ✅ Integration tests

### Frontend CI
- ✅ Build verification
- ✅ Multi-version Node.js testing
- ✅ Build artifact generation

Workflows run on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

## 🚨 Common Issues & Solutions

### MongoDB Connection Issues
```bash
# Make sure MongoDB is running
mongod

# Check MongoDB status
mongo --eval "db.adminCommand('ping')"
```

### Port Already in Use
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (Windows)
taskkill /PID <PID> /F
```

### Docker Issues
```bash
# Remove all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, Sarthakshrivastava1411@gmail.com or create an issue in the repository.

---

**Built with ❤️ using React, Node.js, and MongoDB**
