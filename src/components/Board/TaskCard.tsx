'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/types';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981',
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
    >
      <div
        className="task-card__priority-indicator"
        style={{ backgroundColor: priorityColor[task.priority] }}
      />
      
      <div className="task-card__content">
        <h4 className="task-card__title">{task.title}</h4>
        {task.description && (
          <p className="task-card__description">{task.description}</p>
        )}
        
        <div className="task-card__meta">
          {task.tags.length > 0 && (
            <div className="task-card__tags">
              {task.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="task-card__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {task.dueDate && (
            <span className={`task-card__due-date ${isOverdue ? 'task-card__due-date--overdue' : ''}`}>
              📅 {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
