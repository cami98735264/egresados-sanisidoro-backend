# San Isidoro Egresados - Backend Documentation

## Project Overview
This is the backend service for the San Isidoro Egresados application, built with Node.js and Express. It provides a RESTful API for managing user data, authentication, and information services.

## Project Structure
```
backend/
├── connection/
│   └── connectToDB.js          # Database connection configuration
│
├── middlewares/
│   ├── captcha/
│   │   └── verifyCaptcha.js    # CAPTCHA verification middleware
│   │
│   └── validation/
│       ├── checkAdmin.js       # Admin role verification
│       ├── isAuthenticated.js  # Authentication verification
│       └── findUser.js         # User lookup middleware
│
├── models/
│   ├── ciudades.js            # Cities model
│   ├── departamentos.js       # Departments/States model
│   ├── educacion.js           # Education model
│   ├── init-models.js         # Model initialization
│   └── usuarios.js            # Users model
│
├── router/
│   ├── authentication/
│   │   ├── check.routes.js    # Authentication status check
│   │   ├── index.js           # Authentication routes entry
│   │   ├── login.routes.js    # Login endpoints
│   │   ├── logout.routes.js   # Logout endpoints
│   │   └── register.routes.js # Registration endpoints
│   │
│   ├── plain_info/
│   │   ├── ciudades.routes.js     # Cities information
│   │   ├── departamentos.routes.js# Departments information
│   │   ├── faq.routes.js          # FAQ endpoints
│   │   └── index.js               # Info routes entry
│   │
│   └── usuarios/
│       ├── addEducacion.routes.js    # Add education records
│       ├── all_users.routes.js       # User listing
│       ├── deleteEducacion.routes.js # Remove education records
│       ├── educacion.routes.js       # Education management
│       └── index.js                  # User routes entry
│
├── index.js                   # Application entry point
├── package.json               # Project dependencies
└── package-lock.json          # Dependency lock file
```

## Dependencies
- **express**: Web framework
- **sequelize**: ORM for database operations
- **mysql2**: MySQL database driver
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-Origin Resource Sharing
- **cookie-parser**: Cookie handling
- **dotenv**: Environment variable management
- **axios**: HTTP client
- **nodemon**: Development server with auto-reload

## API Endpoints

### Authentication Routes (/api/auth)
- Handles user authentication and authorization
- JWT-based authentication system

### User Management Routes (/api/usuarios)
- User registration and profile management
- User data CRUD operations

### Information Routes (/api/info)
- General information services
- Public data access

## Database Models
- **usuarios**: User information and credentials
- **educacion**: Educational background
- **ciudades**: City information
- **departamentos**: Department/State information

## Configuration
- Server runs on port 3000
- CORS configured for localhost:3001
- MySQL database connection
- Environment variables required for sensitive data

## Security Features
- Password hashing with bcrypt
- JWT-based authentication
- CORS protection
- CAPTCHA validation
- Input validation middleware

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables
3. Start the development server:
   ```bash
   npm start
   ```

## Development
- Uses nodemon for development
- Sequelize for database operations
- Modular route structure
- Middleware-based request processing
