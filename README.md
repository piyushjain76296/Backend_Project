# Backend Project

A RESTful backend API built with Node.js, Express, and TypeScript, using MongoDB as the database. The project includes authentication, request validation, rate limiting, and a structured source layout following professional conventions.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [License](#license)

---

## Overview

This project serves as a backend service providing secure, scalable API endpoints. It implements JWT-based authentication, password hashing with bcrypt, schema validation using Zod, and rate limiting to protect against abuse.

---

## Tech Stack

**Runtime and Language**
- Node.js
- TypeScript

**Framework**
- Express v5

**Database**
- MongoDB via Mongoose

**Key Libraries**
- `jsonwebtoken` — JWT-based authentication
- `bcryptjs` — Password hashing
- `zod` — Runtime schema validation
- `express-rate-limit` — API rate limiting
- `cors` — Cross-origin resource sharing
- `dotenv` — Environment variable management

**Development Tools**
- `nodemon` — Hot reload during development
- `ts-node` — TypeScript execution without pre-compilation

---

## Project Structure

```
Backend_Project/
├── src/                  # TypeScript source files
│   └── index.ts          # Application entry point
├── dist/                 # Compiled JavaScript output (generated)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Prerequisites

Ensure the following are installed on your system before getting started:

- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- MongoDB (local instance or a cloud URI such as MongoDB Atlas)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/piyushjain76296/Backend_Project.git
   cd Backend_Project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

---

## Environment Variables

Create a `.env` file in the root of the project and configure the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Adjust values as appropriate for your environment.

---

## Available Scripts

| Script        | Command             | Description                                      |
|---------------|---------------------|--------------------------------------------------|
| Development   | `npm run dev`       | Starts the server with nodemon and ts-node       |
| Build         | `npm run build`     | Compiles TypeScript source to the `dist/` folder |
| Production    | `npm start`         | Runs the compiled output from `dist/index.js`    |
| Seed Database | `npm run seed`      | Executes the database seeding script             |

---

## API Overview

The API follows RESTful conventions. All endpoints return JSON responses. Authentication is handled via Bearer tokens in the `Authorization` header.

Rate limiting is applied globally to prevent excessive requests. Input validation is enforced on all incoming request bodies using Zod schemas.

---

## License

This project is licensed under the ISC License.
