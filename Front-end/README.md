# Prospect Management System - Frontend

This is the frontend for the Prospect Management System, built with React, Vite, TypeScript, and Tailwind CSS.

## Features

-   Modern, colorful, and responsive UI
-   CRUD operations for managing prospects
-   Real-time search functionality
-   Interactive modals and smooth animations

## Getting Started

### Prerequisites

-   Node.js (v20 or later)
-   npm
-   A running instance of the backend service

### Installation and Setup

1.  **Clone the repository**
2.  **Navigate to the `Front-end` directory:**
    ```bash
    cd Front-end
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Create an environment file:**
    Create a `.env` file in the `Front-end` root and add the following, pointing to your backend API URL:
    ```
    VITE_API_BASE_URL=http://localhost:3001/api
    ```

### Running the Application

-   **Development Mode:**
    This will start the Vite development server with hot-reloading.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

-   **Production Build:**
    To create a production-ready build of the application:
    ```bash
    npm run build
    ```
    The optimized static files will be located in the `dist` directory. You can preview the production build locally with `npm run preview`.

### Using Docker

To run the entire application stack (frontend and backend) using Docker, navigate to the project root and run:
```bash
docker-compose up --build
```
The frontend will be available at `http://localhost:5173`.

## Project Structure

```
/Front-end
├──/public               # Static assets
├──/src
│  ├──/api                # API service layer (axios)
│  ├──/components         # Reusable React components
│  ├──/hooks              # Custom React hooks
│  ├──/interfaces         # TypeScript interfaces
│  ├──/pages              # Main page components
│  ├── App.tsx            # Main application component
│  ├── main.tsx           # Application entry point
│  └── index.css          # Global styles
├── .env                  # Environment variables
├── package.json
├── tailwind.config.js
└── vite.config.ts
```