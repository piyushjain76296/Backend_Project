# Finance Backend API

## Overview

A RESTful backend service for managing financial records with role-based access control. Built with a focus on clean architecture, security, and real-world fintech patterns.

---

## Features

- JWT-based user authentication
- Role-based access control (Admin, Analyst, Viewer)
- CRUD operations for financial records
- Dashboard summary endpoint
- Rate limiting (100 requests per 15 minutes per IP)
- Centralized error handling
- Input validation with Zod schemas
- Modular code organization

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Authentication:** JWT
- **Validation:** Zod
- **Tools:** Postman, Git

---

## Project Structure

```
zorvyn_assignment/
├── src/
│   ├── config/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── record.controller.ts
│   │   └── user.controller.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   ├── roleMiddleware.ts
│   │   └── validateResource.ts
│   ├── models/
│   │   ├── FinancialRecord.ts
│   │   └── User.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── dashboard.routes.ts
│   │   ├── index.ts
│   │   ├── record.routes.ts
│   │   └── user.routes.ts
│   ├── types/
│   ├── validations/
│   │   ├── auth.schema.ts
│   │   ├── record.schema.ts
│   │   └── user.schema.ts
│   ├── index.ts
│   └── seed.ts
├── package.json
├── tsconfig.json
└── .env
```

---

## API Endpoints

> **Base URL:** `https://finance-backend-yzl9.onrender.com`
>
> All routes are prefixed with `/api`.

### Authentication — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| POST | `/api/auth/login` | ❌ | Login and receive JWT token |

> ⚠️ There is no public register endpoint. Users are created by an Admin via `POST /api/users`, or seeded via `npm run seed`.

---

### Users — `/api/users`

> Requires authentication + **Admin** role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| POST | `/api/users` | Create a new user |
| PATCH | `/api/users/:id/role` | Update a user's role |

---

### Financial Records — `/api/records`

> Requires authentication. Write operations restricted by role.

| Method | Endpoint | Roles | Description |
|--------|----------|-------|-------------|
| GET | `/api/records` | All | List all records |
| POST | `/api/records` | Admin, Analyst | Create a new record |
| GET | `/api/records/:id` | All | Get a single record |
| PUT/PATCH | `/api/records/:id` | Admin, Analyst | Update a record |
| DELETE | `/api/records/:id` | Admin | Delete a record |

---

### Dashboard — `/api/dashboard`

> Requires authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/summary` | Aggregated financial summary |

---

## Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access — all routes including user management and delete |
| `analyst` | Read + create/update records. No delete, no user management |
| `viewer` | Read-only — GET records and dashboard summary only |

---

## Authentication Flow

1. Login via `POST /api/auth/login` with email and password
2. Server validates credentials and returns a JWT token
3. Include the token in the `Authorization` header for all protected routes:
   ```
   Authorization: Bearer <your_token>
   ```

---

## Example Requests

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@finance.local",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin",
    "role": "admin"
  }
}
```

---

### Create a User (Admin only)

```http
POST /api/users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "analyst"
}
```

---

### Create a Financial Record

```http
POST /api/records
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Office Rent",
  "amount": 12000,
  "category": "expense",
  "date": "2024-03-01"
}
```

---

### Get Dashboard Summary

```http
GET /api/dashboard/summary
Authorization: Bearer <token>
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/piyushjain76296/Backend_Project.git
cd Backend_Project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_URI=your_database_url
JWT_SECRET=your_secret_key
```

### 4. Seed demo users

```bash
npx ts-node src/seed.ts
```

This creates the default admin, analyst, and viewer accounts.

### 5. Run the application

```bash
npm start
```

---

## Deployment

Deployed on [Render](https://render.com).

**Live URL:** https://finance-backend-yzl9.onrender.com

> The free tier on Render spins down after inactivity. The first request may take ~30 seconds to wake the server.

---

## Testing

Test all endpoints using [Postman](https://www.postman.com) or any HTTP client.

Suggested test order:
1. `POST /api/auth/login` → copy the token
2. Set `Authorization: Bearer <token>` as a header
3. `GET /api/dashboard/summary`
4. `GET /api/records`
5. `POST /api/records`

---

## Future Improvements

- Public registration endpoint
- Pagination and filtering on records
- Payment integration
- Logging and monitoring
- Swagger / OpenAPI documentation

---

## Author

**Piyush Jain** — Full Stack Developer
