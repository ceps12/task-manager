'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TaskCard } from './TaskCard';
import { Task, Column as ColumnType } from '@/types';
import './Column.css';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column.id,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityCounts = {
    high: tasks.filter((t) => t.priority === 'high').length,
    medium: tasks.filter((t) => t.priority === 'medium').length,
    low: tasks.filter((t) => t.priority === 'low').length,
  };

  return (
    <div ref={setNodeRef} style={style} className="column">
      <div {...attributes} {...listeners} className="column__header">
        {isEditing ? (
          <input
            className="column__title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              if (title.trim()) {
                useStore.getState().setColumns(
                  useStore.getState().columns.map((c) =>
                    c.id === column.id ? { ...c, title } : c
                  )
                );
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
            autoFocus
          />
        ) : (
          <h3 className="column__title" onClick={() => setIsEditing(true)}>
            {column.title}
            <span className="column__count">{tasks.length}</span>
          </h3>
        )}
        <button
          className="column__menu-btn"
          onClick={() => {
            if (window.confirm('Delete this column and all its tasks?')) {
              useStore.getState().deleteColumn(column.id);
            }
          }}
        >
          ✕
        </button>
      </div>

      <div className="column__priority-stats">
        {priorityCounts.high > 0 && (
          <span className="priority-badge priority--high">{priorityCounts.high}</span>
        )}
        {priorityCounts.medium > 0 && (
          <span className="priority-badge priority--medium">{priorityCounts.medium}</span>
        )}
        {priorityCounts.low > 0 && (
          <span className="priority-badge priority--low">{priorityCounts.low}</span>
        )}
      </div>

      <div className="column__tasks">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        <button className="column__add-task-btn" onClick={() => {}}>
          + Add Task
        </button>
      </div>
    </div>
  );
};

import { useStore } from '@/store/useStore';
export default Column;
