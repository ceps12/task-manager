'use client';

import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useStore } from '@/store/useStore';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { Task, Column as ColumnType } from '@/types';
import './Board.css';

export const Board: React.FC = () => {
  const { columns, tasks, currentBoard, moveTask, addColumn } = useStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    if (activeId === overId) return;

    const isActiveAColumn = columns.some((c) => c.id === activeId);
    const isOverAColumn = columns.some((c) => c.id === overId);

    if (isActiveAColumn && isOverAColumn) {
      const newColumns = arrayMove(columns, columns.findIndex((c) => c.id === activeId), columns.findIndex((c) => c.id === overId));
      useStore.getState().setColumns(newColumns);
      return;
    }

    if (isOverAColumn) {
      const overColumn = columns.find((c) => c.id === overId);
      if (overColumn) {
        moveTask(activeId, overId, 0);
      }
    } else {
      const overTask = tasks.find((t) => t.id === overId);
      if (overTask && overTask.columnId !== activeTask.columnId) {
        moveTask(activeId, overTask.columnId, overTask.order);
      }
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeTask = tasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && overTask.columnId !== activeTask.columnId) {
      const overColumn = columns.find((c) => c.id === overTask.columnId);
      if (overColumn) {
        moveTask(activeId, overTask.columnId, overTask.order);
      }
    }
  };

  const handleAddColumn = () => {
    if (!currentBoard) return;
    const newColumn: ColumnType = {
      id: `col-${Date.now()}`,
      title: 'New Column',
      boardId: currentBoard.id,
      order: columns.length,
      createdAt: new Date().toISOString(),
    };
    addColumn(newColumn);
  };

  const columnsWithTasks = columns.map((col) => ({
    ...col,
    tasks: tasks.filter((t) => t.columnId === col.id).sort((a, b) => a.order - b.order),
  }));

  return (
    <div className="board">
      <div className="board__header">
        <h2 className="board__title">{currentBoard?.title || 'Board'}</h2>
        <button className="board__add-btn" onClick={handleAddColumn}>
          + Add Column
        </button>
      </div>
      
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <div className="board__columns">
          <SortableContext items={columnsWithTasks.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {columnsWithTasks.map((column) => (
              <Column key={column.id} column={column} tasks={column.tasks} />
            ))}
          </SortableContext>
        </div>
        
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
