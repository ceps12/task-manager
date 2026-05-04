'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Board } from '@/components/Board/Board';
import { Board as BoardType, Column, Task } from '@/types';

export default function Home() {
  const { setBoards, setColumns, setTasks, setCurrentBoard, isLoading, setLoading } = useStore();

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      const demoBoards: BoardType[] = [
        {
          id: 'board-1',
          title: 'Product Development',
          description: 'Main product roadmap and tasks',
          ownerId: 'user-1',
          members: ['user-1', 'user-2', 'user-3'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      const demoColumns: Column[] = [
        { id: 'col-1', title: 'To Do', boardId: 'board-1', order: 0, createdAt: new Date().toISOString() },
        { id: 'col-2', title: 'In Progress', boardId: 'board-1', order: 1, createdAt: new Date().toISOString() },
        { id: 'col-3', title: 'Done', boardId: 'board-1', order: 2, createdAt: new Date().toISOString() },
      ];

      const demoTasks: Task[] = [
        { id: 'task-1', columnId: 'col-1', boardId: 'board-1', title: 'Design system architecture', description: 'Create high-level architecture diagram for the new platform', priority: 'high', assignee: 'Alex', dueDate: '2025-06-15', tags: ['architecture', 'design'], order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-2', columnId: 'col-1', boardId: 'board-1', title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for automated testing and deployment', priority: 'medium', assignee: 'Sam', dueDate: '2025-06-10', tags: ['devops'], order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-3', columnId: 'col-1', boardId: 'board-1', title: 'Write API documentation', priority: 'low', tags: ['docs'], order: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-4', columnId: 'col-2', boardId: 'board-1', title: 'Implement auth flow', description: 'Firebase authentication with Google and GitHub providers', priority: 'high', assignee: 'Alex', dueDate: '2025-06-08', tags: ['auth', 'firebase'], order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-5', columnId: 'col-2', boardId: 'board-1', title: 'Create dashboard UI', priority: 'medium', assignee: 'Jordan', tags: ['ui', 'frontend'], order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-6', columnId: 'col-3', boardId: 'board-1', title: 'Project setup', description: 'Initialize Next.js project with TypeScript and Tailwind', priority: 'low', assignee: 'Sam', tags: ['setup'], order: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 'task-7', columnId: 'col-3', boardId: 'board-1', title: 'Define data models', priority: 'medium', tags: ['backend'], order: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];

      setBoards(demoBoards);
      setColumns(demoColumns);
      setTasks(demoTasks);
      setCurrentBoard(demoBoards[0]);
      setLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Board />
    </main>
  );
}
