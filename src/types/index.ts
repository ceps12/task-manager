export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  order: number;
  createdAt: string;
}

export interface Task {
  id: string;
  columnId: string;
  boardId: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
  dueDate?: string;
  tags: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BoardMember {
  boardId: string;
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: string;
}
