# Finanger - Financial Ledger Management System

A full-stack web application for managing financial transactions and analytics. Built with **Spring Boot** backend and **Next.js** frontend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Important Configuration Notes](#important-configuration-notes)
- [Troubleshooting](#troubleshooting)

## 🎯 Project Overview

Finanger is a comprehensive financial management platform that allows users to:

- **Track Transactions**: Record and manage financial transactions with different types
- **Dashboard Analytics**: View real-time financial analytics and insights
- **Export Data**: Export transaction data for reporting and analysis
- **Responsive UI**: Modern, responsive user interface built with Next.js and React

### Key Features

- Transaction management (Create, Read, Update, Delete)
- Dashboard with analytics and charts
- Transaction categorization by type
- Data export functionality
- Secure API endpoints with authentication

## 🛠️ Tech Stack

### Backend
- **Java 11+** with Spring Boot
- **Spring Data JPA** for database operations
- **Spring Security** for authentication and authorization
- **Maven** for dependency management
- **H2 Database** (default) or your configured database

### Frontend
- **Next.js 14+** (React framework)
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Shadcn UI** for component library
- **React Hook Form** for form management

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Java JDK 11 or higher** ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Node.js 18 or higher** ([Download](https://nodejs.org/))
- **npm or yarn** (comes with Node.js)
- **Git** for cloning the repository
- **Maven** (optional - Maven wrapper is included)

## 🚀 Project Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd Finanger
```

### Step 2: Backend Setup

Navigate to the backend folder:

```bash
cd finanger-backend
```

#### Configure Database (if needed)

The default configuration uses H2 in-memory database. If you want to use a different database:

1. Open `src/main/resources/application.properties`
2. Update the following properties:

```properties
# Example for MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/finanger_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```

#### Install Backend Dependencies

```bash
./mvnw clean install
```

Or if you have Maven installed:

```bash
mvn clean install
```

### Step 3: Frontend Setup

Navigate to the frontend folder from the root directory:

```bash
cd finanger-frontend
```

Install dependencies:

```bash
npm install
```

Or if using yarn:

```bash
yarn install
```

## 🏃 Running the Application

### Running the Backend

From the `finanger-backend` directory:

```bash
./mvnw spring-boot:run
```

Or:

```bash
mvn spring-boot:run
```

**Backend runs on**: `http://localhost:8080`

The API endpoints will be available at:
- `http://localhost:8080/api/transactions`
- `http://localhost:8080/api/transactions/{id}`
- `http://localhost:8080/api/dashboard/stats`

### Running the Frontend

From the `finanger-frontend` directory:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

**Frontend runs on**: `http://localhost:3000`

### Run Both Simultaneously

Open two terminal windows:

**Terminal 1 (Backend):**
```bash
cd finanger-backend
./mvnw spring-boot:run
```

**Terminal 2 (Frontend):**
```bash
cd finanger-frontend
npm run dev
```

Access the application at `http://localhost:3000`

## ⚙️ Important Configuration Notes

### 1. **API Base URL Configuration**

After cloning, check that the frontend is pointing to the correct backend URL.

**File**: `finanger-frontend/src/lib/api.ts`

Ensure the API base URL matches your backend:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

If your backend runs on a different port or server, update this URL accordingly.

### 2. **CORS Configuration**

The backend has CORS enabled in `SecurityConfig.java`. If you're running frontend and backend on different domains:

**File**: `finanger-backend/src/main/java/com/finanger/finanger_backend/config/SecurityConfig.java`

Update the CORS allowed origins if needed:

```java
.allowedOrigins("http://localhost:3000") // Add your frontend URL here
```

### 3. **Environment Variables (Frontend)**

If you need environment-specific configurations, create a `.env.local` file in `finanger-frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 4. **Database Configuration (Backend)**

**File**: `finanger-backend/src/main/resources/application.properties`

Key properties to review:

```properties
spring.application.name=finanger-backend
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

- `ddl-auto`: Set to `create` for fresh database, `update` for incremental changes, `validate` for production

### 5. **Port Configuration**

To run on different ports:

**Backend** - Add to `application.properties`:
```properties
server.port=8081
```

**Frontend** - Run with:
```bash
npm run dev -- -p 3001
```

## 🧪 Running Tests

### Backend Tests

```bash
cd finanger-backend
./mvnw test
```

### Frontend Tests

```bash
cd finanger-frontend
npm run test
```

## 📝 Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload during development
2. **API Testing**: Use tools like Postman or Insomnia to test API endpoints during development
3. **Browser DevTools**: Use React Developer Tools extension for debugging the frontend
4. **Database Console**: Access H2 console at `http://localhost:8080/h2-console` (if using H2)

## 🐛 Troubleshooting

### Backend Won't Start

- **Error**: "Port 8080 already in use"
  - Solution: Change the port in `application.properties` or kill the process using port 8080

- **Error**: "Database connection refused"
  - Solution: Verify database is running and credentials in `application.properties` are correct

### Frontend Shows Blank Page

- **Error**: "Failed to fetch from API"
  - Solution: Ensure backend is running and API URL in `api.ts` is correct
  - Check browser console for CORS errors

- **Error**: "Module not found"
  - Solution: Run `npm install` again and clear node_modules if needed

### Port Issues

```bash
# Find process using port 8080
netstat -ano | findstr :8080  # Windows
lsof -i :8080  # macOS/Linux

# Kill the process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # macOS/Linux
```

## 📦 Building for Production

### Backend

```bash
cd finanger-backend
./mvnw clean package
```

This creates a JAR file in `target/` directory.

### Frontend

```bash
cd finanger-frontend
npm run build
npm start
```

## 🤝 Contributing

When contributing to this project:

1. Keep the same folder structure
2. Follow existing code style and patterns
3. Update this README if you add new setup steps
4. Test both frontend and backend before submitting changes

## 📞 Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure both ports (8080 for backend, 3000 for frontend) are available
4. Check console logs for detailed error messages

---

**Happy coding! 🚀**
