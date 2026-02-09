# Full-Stack To-Do App

A modern, scalable To-Do application built with a separate frontend and backend architecture.

## ✨ Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete tasks
- 🔄 **Toggle Status**: Mark tasks as completed or pending
- 📅 **Date Sorting**: Sort tasks by creation date (ascending/descending)
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- ⚡ **Real-time Updates**: Instant UI updates with React Query
- 📝 **Task Descriptions**: Add optional descriptions to tasks
- 🎯 **Type Safety**: Full TypeScript support on both frontend and backend

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI (Custom implementation)
- **State Management**: React Query
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (running locally or via cloud service)

## 🚀 Setup & Running

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd test
```

### 2. Database Setup

Create a PostgreSQL database or use a cloud service like Aiven, Supabase, or Railway.

### 3. Backend Setup

```bash
cd server
npm install

# Copy the environment example file
cp .env.example .env

# Edit .env and add your DATABASE_URL
# Example: postgresql://user:password@host:port/database?schema=public

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

The server will start on `http://localhost:3000`.

### 4. Frontend Setup

Open a **new** terminal and run:

```bash
cd client
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 📁 Project Structure

```
test/
├── client/              # React frontend
│   ├── src/
│   │   ├── api/        # API client functions
│   │   ├── components/ # React components
│   │   ├── lib/        # Utility functions
│   │   └── App.tsx     # Main app component
│   └── package.json
├── server/              # Express backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── services/    # Business logic
│   │   └── index.ts     # Server entry point
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

- `GET /api/tasks?sort=desc` - Get all tasks (sorted by creation date)
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `PATCH /api/tasks/:id/complete` - Toggle task completion status

## 🔧 Development

### Backend Commands

```bash
cd server
npm run dev          # Start development server
npm run build        # Build for production
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma migrate dev # Create new migration
```

### Frontend Commands

```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License

