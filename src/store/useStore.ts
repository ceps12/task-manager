import { create } from 'zustand';
import { Board, Column, Task } from '@/types';

const demoBoards: Board[] = [
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

interface TaskStore {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  currentBoard: Board | null;
  isLoading: boolean;
  
  setBoards: (boards: Board[]) => void;
  setColumns: (columns: Column[]) => void;
  setTasks: (tasks: Task[]) => void;
  setCurrentBoard: (board: Board | null) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newColumnId: string, newIndex: number) => void;
  addColumn: (column: Column) => void;
  deleteColumn: (columnId: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<TaskStore>((set) => ({
  boards: demoBoards,
  columns: demoColumns,
  tasks: demoTasks,
  currentBoard: demoBoards[0],
  isLoading: false,

  setBoards: (boards) => set({ boards }),
  setColumns: (columns) => set({ columns }),
  setTasks: (tasks) => set({ tasks }),
  setCurrentBoard: (currentBoard) => set({ currentBoard }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updates) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)),
    })),
  deleteTask: (taskId) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== taskId) })),
  moveTask: (taskId, newColumnId, newIndex) =>
    set((state) => {
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task) return state;
      
      const updatedTasks = state.tasks
        .filter((t) => t.id !== taskId && t.columnId !== newColumnId)
        .map((t) =>
          t.columnId === newColumnId && t.order >= newIndex
            ? { ...t, order: t.order + 1 }
            : t
        );
      
      updatedTasks.push({
        ...task,
        columnId: newColumnId,
        order: newIndex,
        updatedAt: new Date().toISOString(),
      });
      
      return { tasks: updatedTasks };
    }),
  addColumn: (column) => set((state) => ({ columns: [...state.columns, column] })),
  deleteColumn: (columnId) =>
    set((state) => ({
      columns: state.columns.filter((c) => c.id !== columnId),
      tasks: state.tasks.filter((t) => t.columnId !== columnId),
    })),
  setLoading: (isLoading) => set({ isLoading }),
}));
