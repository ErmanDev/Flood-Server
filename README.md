# Flood Server - Authentication & User Management

This is the **authentication and user management** backend server for the Flood Monitoring System.

## ⚠️ Important: Server Separation

This server (`flood-server`) is **ONLY** responsible for:
- ✅ User authentication (login, register)
- ✅ User management (fetching users, updating user status)
- ✅ JWT token generation

**This server does NOT handle:**
- ❌ Sensor data (distance, water level, etc.)
- ❌ Pinned areas
- ❌ Logs
- ❌ Dashboard statistics
- ❌ Health checks

Those features are handled by a **separate backend** at `https://flood-backend-7rfe.onrender.com/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Body: `{ "username": "test", "email": "test@test.com", "password": "123", "firstName": "John", "lastName": "Doe", "address": "123 Main St" }`
- `POST /api/auth/login` - Login existing user
  - Body: `{ "email": "test@test.com", "password": "123" }` or `{ "username": "test", "password": "123" }`

### User Management
- `GET /api/users` - Get all users (for admin dashboard)
- `PUT /api/users/:id/status` - Update user status
  - Body: `{ "status": "Verified" | "Pending Verification" | "Rejected" }`

## Pre-requisites

- Node.js (v18+)
- Supabase PostgreSQL database (or local PostgreSQL for development)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@host:port/database
   # OR use individual variables:
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=flood_db
   JWT_SECRET=super_secret_jwt_key_flood_monitoring
   NODE_ENV=development
   ```

3. For Supabase:
   - Create a project at https://supabase.com
   - Get your connection string from Project Settings → Database
   - Add `DATABASE_URL` to your `.env` file

## Scripts

- Start server (development):
  ```bash
  npm run server
  ```
- Build project:
  ```bash
  npm run build
  ```
- Start production server:
  ```bash
  npm start
  ```

## Database

This server uses **PostgreSQL** (via Supabase) and only creates the `users` table.

The database will automatically:
- Create the `users` table on first run
- Insert a default admin user (email: `admin@gmail.com`, password: `admin123`)

## Deployment

Deploy to Render, Vercel, or any Node.js hosting service:

1. Set environment variables:
   - `DATABASE_URL` - Your Supabase connection string
   - `JWT_SECRET` - Secret key for JWT tokens
   - `NODE_ENV=production`

2. Build command: `npm install && npm run build`
3. Start command: `npm start`

## Production URL

- **Authentication Server**: `https://flood-server-02ay.onrender.com/api`
- **Sensor Data Server**: `https://flood-backend-7rfe.onrender.com/api` (separate project)
