import { create } from 'zustand';
import { Board, Column, Task } from '@/types';

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
  boards: [],
  columns: [],
  tasks: [],
  currentBoard: null,
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
