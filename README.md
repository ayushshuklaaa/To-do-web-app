# BetterTasks - Modern Todo Application

A full-stack todo application built with FastAPI and React, featuring a beautiful UI, task prioritization, multiple lists, and user authentication.

![BetterTasks](https://img.shields.io/badge/BetterTasks-Todo%20App-blue)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

## ✨ Features

- ✅ **Task Management**: Create, update, delete, and mark tasks as complete
- 📋 **Multiple Lists**: Organize tasks into different lists with custom names and emojis
- 🎯 **Priority Levels**: Set task priorities (High, Medium, Low) with color-coded badges
- 👤 **User Authentication**: Secure registration and login system
- 🌙 **Dark Mode**: Toggle between light and dark themes
- ⚡ **Real-time Updates**: Instant UI updates with optimized state management
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful, intuitive interface built with Tailwind CSS
- ⏰ **Smart Timestamps**: Relative time display (e.g., "5m ago", "2h ago")
- 🚀 **Auto List Creation**: Automatically creates a default list when adding tasks

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Lightweight database
- **Pydantic** - Data validation
- **Passlib** - Password hashing
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** and **npm** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/downloads)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd To-do-web-app
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

**Create and activate virtual environment:**

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

**Install dependencies:**

```bash
pip install -r requirements.txt
```

**Seed the database (first time only):**

```bash
python seed.py
```

This creates a test account:
- **Email:** `test@example.com`
- **Password:** `password123`

**Start the backend server:**

```bash
uvicorn main:app --reload --port 8001
```

The API will be available at:
- **API:** http://localhost:8001
- **API Documentation:** http://localhost:8001/docs

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5173

## 📁 Project Structure

```
To-do-web-app/
├── backend/
│   ├── routers/          # API route handlers
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── users.py      # User endpoints
│   │   ├── lists.py      # Task list endpoints
│   │   └── tasks.py      # Task endpoints
│   ├── models.py         # SQLAlchemy database models
│   ├── schemas.py        # Pydantic schemas
│   ├── database.py       # Database configuration
│   ├── main.py           # FastAPI application
│   ├── seed.py           # Database seeding script
│   ├── requirements.txt  # Python dependencies
│   └── bettertasks.db    # SQLite database (created automatically)
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   │   └── ui/       # UI component library
    │   ├── lib/          # Utilities and API client
    │   ├── pages/        # Page components
    │   ├── App.tsx       # Main app component
    │   └── TodoList.tsx  # Main todo list component
    ├── package.json      # Node.js dependencies
    └── vite.config.ts    # Vite configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/{id}` - Get user by ID

### Lists
- `GET /api/lists/?owner_id={id}` - Get all lists for a user
- `POST /api/lists/` - Create a new list
- `DELETE /api/lists/{id}` - Delete a list

### Tasks
- `GET /api/tasks/?list_id={id}` - Get all tasks for a list
- `POST /api/tasks/` - Create a new task
- `PATCH /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/finish-all/{list_id}` - Mark all tasks in a list as complete

## 💻 Usage

1. **Start the backend server** (Terminal 1):
   ```bash
   cd backend
   venv\Scripts\activate  # Windows
   uvicorn main:app --reload --port 8001
   ```

2. **Start the frontend server** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to http://localhost:5173

4. **Login** with the test account or create a new account

5. **Create lists** and start adding tasks!

## 🎯 Key Features Explained

### Automatic List Creation
If you try to add a task without creating a list first, the app automatically creates a default "My Tasks" list for you.

### Task Priorities
Tasks can have three priority levels:
- 🔴 **High** - Yellow badge
- 🔵 **Medium** - Blue badge  
- 🟢 **Low** - Green badge

### Dark Mode
Toggle dark mode using the theme switcher in the sidebar. Your preference is saved in localStorage.

### Relative Timestamps
Task creation times are displayed as relative time:
- "Just now" - Less than a minute
- "5m ago" - Minutes ago
- "2h ago" - Hours ago
- "3d ago" - Days ago
- "Jan 15" - Older dates

## 🗄️ Database

The application uses SQLite database (`bettertasks.db`) located in the `backend` directory.

### View Database

**Using VS Code:**
1. Install "SQLite Viewer" extension
2. Right-click `backend/bettertasks.db`
3. Select "Open Database"

**Using DB Browser:**
1. Download [DB Browser for SQLite](https://sqlitebrowser.org/)
2. Open `backend/bettertasks.db`

**Using Command Line:**
```bash
cd backend
sqlite3 bettertasks.db
.tables
SELECT * FROM tasks;
```

## 🐛 Troubleshooting

### Backend Issues

**Port 8001 already in use:**
```bash
# Change port in uvicorn command
uvicorn main:app --reload --port 8002
```

**Database errors:**
```bash
# Delete database and reseed
rm bettertasks.db  # or del bettertasks.db on Windows
python seed.py
```

**Virtual environment not activating:**
- Make sure you're in the `backend` directory
- Use PowerShell or CMD (not Git Bash for Windows)

### Frontend Issues

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
- Vite will automatically use the next available port

**Backend connection errors:**
- Ensure backend is running on port 8001
- Check CORS settings in `backend/main.py`

## 📝 Development

### Backend Development

The backend uses FastAPI with automatic API documentation at `/docs`. All endpoints are RESTful and follow standard HTTP methods.

### Frontend Development

The frontend uses Vite for fast hot module replacement. Changes to React components will automatically reload in the browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created with ❤️ for better task management

---

**Happy Task Managing! 🚀**
