# Prospect Management System - Backend

This is the backend for the Prospect Management System, built with Node.js, Express, TypeScript, and Prisma.

## Features

- RESTful API for managing prospects
- SQLite database with Prisma ORM
- Request validation with Zod
- Secure by default with Helmet and Rate Limiting

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm
- Docker (optional, for containerized setup)

### Installation and Setup

1.  **Clone the repository**
2.  **Navigate to the `Backend` directory:**
    ```bash
    cd Backend
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create an environment file:**
    Create a `.env` file in the `Backend` root and copy the contents of `.env.example` (if provided) or add the following:
    ```
    PORT=3001
    CORS_ORIGIN=http://localhost:5173
    DATABASE_URL="file:./data/dev.db"
    ```
5.  **Initialize the database:**
    This command will create the SQLite database file and apply the schema.
    ```bash
    npx prisma db push
    ```

### Running the Application

-   **Development Mode (with hot-reloading):**
    ```bash
    npm run dev
    ```
-   **Production Mode:**
    First, build the TypeScript code:
    ```bash
    npm run build
    ```
    Then, start the server:
    ```bash
    npm start
    ```

### Using Docker

To run the entire application stack (frontend and backend) using Docker, navigate to the project root and run:
```bash
docker-compose up --build
```
The backend will be available at `http://localhost:3001`.

## API Endpoints

All endpoints are prefixed with `/api`.

### Prospects

-   `GET /prospects`: Get all prospects.
    -   Query Params: `search` (string) - Filters prospects by name, email, or company.
-   `POST /prospects`: Create a new prospect.
-   `GET /prospects/:id`: Get a single prospect by ID.
-   `PUT /prospects/:id`: Update a prospect by ID.
-   `DELETE /prospects/:id`: Delete a prospect by ID.

## Project Structure

```
/Backend
├──/prisma
│  └── schema.prisma      # Prisma database schema
├──/src
│  ├──/controller         # Request handlers
│  ├──/middleware         # Express middleware
│  ├──/routes             # API routes
│  ├──/utils              # Utility functions
│  ├──/validation         # Zod validation schemas
│  ├── app.ts             # Express app configuration
│  └── server.ts          # Server entry point
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```