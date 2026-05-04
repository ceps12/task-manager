# Task Manager

Full-stack task management app with authentication, drag-and-drop boards, and real-time collaboration features.

## ✨ Features

- **Kanban Boards** — Drag-and-drop task management with customizable columns
- **Real-time Collaboration** — Share boards with team members and work together
- **Task Management** — Create, edit, and organize tasks with priorities, tags, and due dates
- **Authentication** — Secure Firebase authentication (Email/Password, Google, GitHub)
- **Priority System** — High, medium, low priority with visual indicators
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Theme** — Beautiful modern UI with dark theme

## 🚀 Live Demo

https://task-manager-ceps12.vercel.app/

## 🛠 Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Firebase** for authentication and database
- **@dnd-kit** for drag-and-drop functionality
- **Zustand** for state management
- **Framer Motion** for animations

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ceps12/task-manager.git

# Navigate to the project directory
cd task-manager

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with your Firebase credentials
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main board view
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   └── Board/
│       ├── Board.tsx         # Main board component
│       ├── Column.tsx        # Kanban column
│       └── TaskCard.tsx      # Task card
├── lib/
│   └── firebase.ts           # Firebase configuration
├── store/
│   └── useStore.ts           # Zustand state store
└── types/
    └── index.ts              # TypeScript interfaces
```

## 🎨 Features Detail

### Drag-and-Drop Boards
- Intuitive drag-and-drop interface using @dnd-kit
- Reorder tasks within and between columns
- Reorder columns themselves
- Smooth animations and visual feedback

### Task Management
- Create tasks with title, description, and priority
- Add tags for better organization
- Set due dates with overdue indicators
- Visual priority indicators (high/medium/low)

### Collaboration
- Share boards with team members
- Multiple user roles (owner, editor, viewer)
- Real-time updates (with Firebase)

## 🔌 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google, GitHub)
3. Create Firestore database
4. Copy configuration to `.env.local`

## 📄 License

MIT © ceps12
