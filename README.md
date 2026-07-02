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
Architecture:
1 Layered Backend Architecture: The backend follows a standard layered approach (Controller -> Service -> Repository) to maintain a clear separation of concerns.
2 RESTful API: Facilitates seamless communication between the frontend and backend.
3 Real-time Synchronization: Utilizes WebSockets for real-time task updates and notifications, ensuring the UI remains consistent without needing manual page refreshes.

Algorithms & Data Structures
1 Task State Management: Uses a status-based filtering algorithm to toggle between 'All', 'Pending', and 'Completed' tasks efficiently.
2 Authentication Flow: Implements JWT (JSON Web Token) based authentication, utilizing BCrypt for password hashing to ensure secure storage and validation.
3 State Management: The frontend employs the Context API as a data structure to maintain global state, providing a predictable and unidirectional flow of task data across the component hierarchy.

6. Testing Evidence
Backend Testing (Java/Spring Boot)
1 Unit Testing: Used JUnit 5 and Mockito to test service-layer logic in isolation, ensuring that task status transitions and validation rules work as expected.
2 Integration Testing: Implemented Testcontainers to spin up a transient PostgreSQL instance, verifying that database migrations (Flyway) and repository methods interact correctly with the database.
3 Security Testing: Validated authentication endpoints using manual tests to ensure that protected resources are inaccessible without a valid JWT.

Frontend Testing (React/TypeScript)
1 Component Testing: Used Vitest and React Testing Library to render components (like TaskForm and TaskList) and verify that they correctly display state-driven data.
2 API Mocking: Employed MSW (Mock Service Worker) to simulate API responses, allowing for testing of edge cases like network errors and successful task retrieval without needing a live backend.
3 Validation: Verified form submission behavior using React Hook Form to ensure invalid task data is blocked before reaching the API layer.

7. Component Architecture
Component Hierarchy
1 The application follows a hierarchical structure where the App component acts as the main entry point:
2 App: Wraps the application with global providers (AuthContext, TaskContext).
3 Layout: Provides the navigation and structural shell for the app.
4 Dashboard: The primary container that holds the TaskForm and TaskList components.
5 TaskList: Renders individual task items, receiving task data as props.
6 LoginForm: An isolated component dedicated to user authentication and credentials handling.

Data Flow Diagram
The data flow is designed to be unidirectional and predictable:
1 User Action: An action (e.g., adding a task) is triggered in the TaskForm.
2 API Call: The form calls the services/api.ts layer to send a request to the Spring Boot backend.
3 State Update: Upon a successful API response, the TaskContext updates the global application state.
4 UI Refresh: React detects the state change in the TaskContext and triggers a re-render of the TaskList component to show the updated data.
5 Real-time Sync: The WebSocketService listens for server-side events to push updates directly to the client, triggering a state update in real-time.
[Data Flow Diagram](assets/data-flow.png)

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
