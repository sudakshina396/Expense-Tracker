# Expense Tracker (MERN: React + TypeScript + Express + TypeScript)

Beginner-friendly CRUD app with MongoDB.

## Project
- `client/` - React + Vite + Tailwind + Axios
- `server/` - Express + TypeScript + Mongoose

## Requirements
- Node.js
- MongoDB (local or Atlas)

## Run
### 1) Server
```bash
cd server
npm i
npm run dev
```
Server runs on http://localhost:5000

### 2) Client
```bash
cd ../client
npm i
npm run dev
```
Client runs on http://localhost:5173

## API
Base: `/api/transactions`
- GET `/`?search=&category=&type=
- POST `/`
- PUT `/:id`
- DELETE `/:id`

