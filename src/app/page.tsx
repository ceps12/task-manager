'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Board } from '@/components/Board/Board';
import { Board as BoardType } from '@/types';

export default function Home() {
  const { boards, setBoards, setCurrentBoard, isLoading, setLoading } = useStore();

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
        {
          id: 'board-2',
          title: 'Marketing Campaign',
          description: 'Q4 marketing initiatives',
          ownerId: 'user-1',
          members: ['user-1', 'user-2'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setBoards(demoBoards);
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
