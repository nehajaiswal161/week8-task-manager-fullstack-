Full Stack Task Manager Application

1. Project Overview
A complete full-stack task management application with React TypeScript frontend and Spring Boot backend. This project demonstrates professional full-stack development skills by implementing features like JWT authentication, real-time updates, and drag-and-drop task management.

2. Setup Instructions
Using Docker Compose:
Bash
# Start all services
docker-compose up -d
Manual Setup:
Backend:

Bash
cd backend
mvn spring-boot:run
Frontend:

Bash
cd frontend
npm install
npm run dev

3. Code Structure
The project follows a well-organized directory structure to separate concerns between the backend and frontend:
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

## 4. Visual Documentation

### Login Page
![Login Page](login.png)

### Task Dashboard
![Dashboard](dashboard.png)

### Task Interaction
![Task Action](task-action.png)

5. Technical Details
Architecture
Layered Backend Architecture: The backend follows a standard layered approach (Controller -> Service -> Repository) to maintain a clear separation of concerns.

RESTful API: Facilitates seamless communication between the frontend and backend.

Real-time Synchronization: Utilizes WebSockets for real-time task updates and notifications, ensuring the UI remains consistent without needing manual page refreshes.

Algorithms & Data Structures
Task State Management: Uses a status-based filtering algorithm to toggle between 'All', 'Pending', and 'Completed' tasks efficiently.

Authentication Flow: Implements JWT (JSON Web Token) based authentication, utilizing BCrypt for password hashing to ensure secure storage and validation.

State Management: The frontend employs the Context API as a data structure to maintain global state, providing a predictable and unidirectional flow of task data across the component hierarchy.

6. Testing Evidence
Backend Testing (Java/Spring Boot)
Unit Testing: Used JUnit 5 and Mockito to test service-layer logic in isolation, ensuring that task status transitions and validation rules work as expected.

Integration Testing: Implemented Testcontainers to spin up a transient PostgreSQL instance, verifying that database migrations (Flyway) and repository methods interact correctly with the database.

Security Testing: Validated authentication endpoints using manual tests to ensure that protected resources are inaccessible without a valid JWT.

Frontend Testing (React/TypeScript)
Component Testing: Used Vitest and React Testing Library to render components (like TaskForm and TaskList) and verify that they correctly display state-driven data.

API Mocking: Employed MSW (Mock Service Worker) to simulate API responses, allowing for testing of edge cases like network errors and successful task retrieval without needing a live backend.

Validation: Verified form submission behavior using React Hook Form to ensure invalid task data is blocked before reaching the API layer.

7. Component Architecture
Component Hierarchy
The application follows a hierarchical structure where the App component acts as the main entry point:

App: Wraps the application with global providers (AuthContext, TaskContext).

Layout: Provides the navigation and structural shell for the app.

Dashboard: The primary container that holds the TaskForm and TaskList components.

TaskList: Renders individual task items, receiving task data as props.

LoginForm: An isolated component dedicated to user authentication and credentials handling.

Data Flow Diagram
The data flow is designed to be unidirectional and predictable:

User Action: An action (e.g., adding a task) is triggered in the TaskForm.

API Call: The form calls the services/api.ts layer to send a request to the Spring Boot backend.

State Update: Upon a successful API response, the TaskContext updates the global application state.

UI Refresh: React detects the state change in the TaskContext and triggers a re-render of the TaskList component to show the updated data.

Real-time Sync: The WebSocketService listens for server-side events to push updates directly to the client, triggering a state update in real-time.
[Data Flow Diagram](assets/data-flow.png)

8. API DocumentationThis section details the RESTful API endpoints available in the application.A. Authentication APIHandles user identity and session security.MethodEndpointDescriptionExample Request BodyPOST/api/auth/registerRegister a new user{"username": "neha", "password": "password123"}POST/api/auth/loginAuthenticate and get JWT{"username": "neha", "password": "password123"}POST/api/auth/logoutInvalidate current sessionN/AB. Task Management APIHandles CRUD operations for task items.Note: All task endpoints require a valid JWT in the Authorization Header.MethodEndpointDescriptionExample Request BodyGET/api/tasksFetch all tasksN/APOST/api/tasksCreate a new task{"title": "Complete Project", "status": "PENDING"}PUT/api/tasks/{id}Update existing task{"title": "Submit Assignment", "status": "COMPLETED"}DELETE/api/tasks/{id}Remove a taskN/AC. WebSocket Real-Time APIUsed for live updates.Endpoint: ws://localhost:8080/wsTopic: /topic/tasks (Subscribing to this topic will receive real-time updates whenever a task is created or modified by any user.)
