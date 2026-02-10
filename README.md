# Flood Server

This is the backend server for Flood Monitoring System, handling authentication (login/register) and data storage.

## Pre-requisites

- Node.js (v18+)
- MongoDB running locally on port 27017 (or update `.env` with URI)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start MongoDB locally (e.g., via Docker or installed service).

3. Create `.env` file (already created):
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/flood-db
   JWT_SECRET=super_secret_jwt_key_flood_monitoring
   ```

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

## API Endpoints

- `POST /api/auth/register` - Create new user
  - Body: `{ "username": "test", "email": "test@test.com", "password": "123" }`
- `POST /api/auth/login` - Login existing user
  - Body: `{ "email": "test@test.com", "password": "123" }`
