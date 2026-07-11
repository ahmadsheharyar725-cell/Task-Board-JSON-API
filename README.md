# Team Flow – Team Task Management System

## Overview

Team Flow is a full-stack task management application that helps teams organize work, assign tasks, and monitor task progress through a clean and responsive interface.

The project demonstrates modern full-stack web development concepts by combining a React frontend with an Express.js backend. Instead of using a database, the application stores data in local JSON files, making it lightweight and easy to understand for learning CRUD operations.

---

## Features

- View all team members
- Assign tasks to team members
- Edit existing tasks
- Delete tasks
- Track task status
- Responsive user interface
- RESTful API
- JSON-based data persistence
- State management using Context API and useReducer

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- React Bootstrap
- Bootstrap 5
- React Icons
- Context API
- useReducer

### Backend

- Node.js
- Express.js
- CORS

### Data Storage

- JSON Files

---

## Application Workflow

```
React Frontend
        │
        ▼
Express REST API
        │
        ▼
JSON Files
```

---

## REST API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | / | Fetch team members and tasks |
| POST | /tasks | Create a new task |
| PATCH | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Screens

- Home
- Team Members
- Tasks
- Assign Task

---

## Project Structure

```
Team Flow
│
├── Frontend
│   ├── Components
│   ├── Context
│   ├── Reducer
│   ├── Pages
│   └── App.jsx
│
├── Backend
│   ├── server.js
│   └── db
│       ├── team.json
│       └── tasks.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/team-flow.git
```

### Install Frontend

```bash
npm install
```

### Start Frontend

```bash
npm run dev
```

### Install Backend Dependencies

```bash
npm install
```

### Start Backend

```bash
node server.js
```

---

## Future Improvements

- MongoDB Integration
- JWT Authentication
- User Login System
- Due Dates
- Task Priority
- Search Tasks
- Filter Tasks
- Dashboard Analytics
- Notifications
- Drag & Drop Tasks

---

## Author

**Sheharyar Ahmad**

