Full Stack Task Manager Application

1. Project Overview
A complete full-stack task management application with React TypeScript frontend and Spring Boot backend. This project demonstrates professional full-stack development skills by implementing features like JWT authentication, real-time updates, and drag-and-drop task management.

## 2. Setup Instructions
### Using Docker Compose
```bash
docker-compose up -d
```
Manual Setup:
Backend:
```bash
cd backend
mvn spring-boot:run
```
Frontend:
```bash
cd frontend
npm install
npm run dev
```
## 3. Code Structure
The project follows a well-organized directory structure to separate concerns between the backend and frontend:
```text
week8-task-manager-fullstack/
│── backend/ (Spring Boot)
│ ├── src/main/java/com/taskmanager/
│ │ ├── config/       # Security, WebSocket, and CORS configurations
│ │ ├── controller/   # REST API controllers
│ │ ├── service/      # Business logic services
│ │ ├── security/     # JWT authentication and filters
│ │ └── model/        # Entities, DTOs, and Enums
│ ├── src/main/resources/ # Configuration and database migrations
│ ├── Dockerfile      # Backend containerization
│ └── pom.xml         # Maven dependencies
│
│── frontend/ (React TypeScript)
│ ├── src/
│ │ ├── components/   # Reusable UI components
│ │ ├── pages/        # Page-level components (Dashboard, Login)
│ │ ├── services/     # API and WebSocket communication logic
│ │ ├── hooks/        # Custom React hooks
│ │ ├── context/      # Auth and Task state management
│ │ └── types/        # TypeScript interfaces
│ ├── package.json    # Frontend dependencies
│ └── vite.config.ts  # Vite configuration
│
│── docker-compose.yml # Orchestration for backend/frontend/database
│└── README.md         # Project documentation
```

## 4. Visual Documentation
### Login Page
![Login Page](login.png)

### Task Dashboard
![Dashboard](dashboard.png)

### Task Interaction
![Task Action](task-action.png)

## 5. Technical Details

### Architecture

The application follows a modern full-stack architecture to ensure scalability, maintainability, and real-time performance.

#### Layered Backend Architecture
The Spring Boot backend follows a layered architecture:

```
Controller → Service → Repository → Database
```

This separation of concerns improves code organization, maintainability, and testability.

#### RESTful API
The frontend communicates with the backend through RESTful APIs, enabling efficient CRUD operations for authentication and task management.

#### Real-Time Synchronization
WebSocket (STOMP over SockJS) is used to broadcast task updates instantly to all connected clients, ensuring that the UI stays synchronized without requiring manual page refreshes.

---

### Algorithms & Data Structures

#### Task State Management
Tasks are filtered based on their status (`ALL`, `PENDING`, `COMPLETED`) using efficient state-based filtering, allowing quick switching between different task views.

#### Authentication Flow
The application uses JWT (JSON Web Token) for authentication and BCrypt for password hashing, ensuring secure credential storage and protected API access.

#### Frontend State Management
React Context API is used for global state management, providing a predictable and unidirectional flow of task data across components.

---

## 6. Testing Evidence

### Backend Testing (Spring Boot)

#### Unit Testing
- Implemented using **JUnit 5** and **Mockito**.
- Tested service-layer business logic independently.
- Verified task creation, updates, validation, and status transitions.

#### Integration Testing
- Used **Testcontainers** with PostgreSQL.
- Verified database connectivity, Flyway migrations, and repository operations.

#### Security Testing
- Tested JWT authentication manually.
- Verified that protected endpoints reject unauthorized requests.
- Confirmed authenticated users can access secured resources.

---

### Frontend Testing (React + TypeScript)

#### Component Testing
- Used **Vitest** and **React Testing Library**.
- Tested components such as **TaskForm** and **TaskList**.
- Verified rendering, user interactions, and state updates.

#### API Mocking
- Used **MSW (Mock Service Worker)**.
- Simulated backend responses for success and error scenarios.
- Enabled frontend testing without requiring a running backend server.

#### Form Validation
- Tested form validation using **React Hook Form**.
- Ensured invalid task inputs are prevented before API submission.

---

## 7. Component Architecture

### Component Hierarchy

The application follows a hierarchical component structure:

```
App
│
├── AuthProvider
├── TaskProvider
│
└── Layout
    │
    ├── LoginForm
    │
    └── Dashboard
        │
        ├── TaskForm
        └── TaskList
            └── TaskItem
```

### Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| **App** | Entry point of the application and wraps global providers. |
| **AuthProvider** | Manages authentication state and JWT token. |
| **TaskProvider** | Stores and updates global task state. |
| **Layout** | Provides the application's overall structure and navigation. |
| **Dashboard** | Displays task management interface. |
| **TaskForm** | Creates new tasks and edits existing ones. |
| **TaskList** | Displays all tasks. |
| **TaskItem** | Represents an individual task. |
| **LoginForm** | Handles user authentication. |

---

### Data Flow

The application follows a unidirectional data flow:

1. User performs an action (e.g., creating a task).
2. `TaskForm` sends the request through the API service.
3. The Spring Boot backend processes the request.
4. The backend returns the updated task data.
5. `TaskContext` updates the global application state.
6. React automatically re-renders `TaskList` with the latest data.
7. WebSocket broadcasts updates to all connected clients for real-time synchronization.

### Data Flow Diagram

![Data Flow Diagram](assets/data-flow.png)

## 8. API Documentation

This section describes the RESTful API endpoints available in the application.

---

### A. Authentication API

Handles user authentication and session management.

| Method | Endpoint | Description | Example Request Body |
|--------|----------|-------------|----------------------|
| **POST** | `/api/auth/register` | Register a new user | ```json { "username": "neha", "password": "password123" } ``` |
| **POST** | `/api/auth/login` | Authenticate user and receive JWT token | ```json { "username": "neha", "password": "password123" } ``` |
| **POST** | `/api/auth/logout` | Logout the current user and invalidate the session | N/A |

---

### B. Task Management API

Handles CRUD operations for task management.

> **Note:** All task endpoints require a valid JWT in the `Authorization` header.

| Method | Endpoint | Description | Example Request Body |
|--------|----------|-------------|----------------------|
| **GET** | `/api/tasks` | Fetch all tasks | N/A |
| **POST** | `/api/tasks` | Create a new task | ```json { "title": "Complete Project", "status": "PENDING" } ``` |
| **PUT** | `/api/tasks/{id}` | Update an existing task | ```json { "title": "Submit Assignment", "status": "COMPLETED" } ``` |
| **DELETE** | `/api/tasks/{id}` | Delete a task | N/A |

---

### C. WebSocket Real-Time API

Provides real-time task updates using WebSocket.

| Property | Value |
|----------|-------|
| **WebSocket Endpoint** | `ws://localhost:8080/ws` |
| **Topic** | `/topic/tasks` |

**Description:**

Clients subscribed to `/topic/tasks` receive real-time notifications whenever a task is created, updated, or modified by any authenticated user.

---

### Authorization Header Example

```http
Authorization: Bearer <your_jwt_token>
```
