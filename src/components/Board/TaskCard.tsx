'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '@/store/useStore';
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

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editPriority, setEditPriority] = useState(task.priority);

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

  const handleSave = () => {
    if (!editTitle.trim()) return;
    useStore.getState().updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      useStore.getState().deleteTask(task.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
      setEditDescription(task.description || '');
      setEditPriority(task.priority);
    }
  };

  if (isEditing) {
    return (
      <div className="task-card task-card--editing">
        <div
          className="task-card__priority-indicator"
          style={{ backgroundColor: priorityColor[editPriority] }}
        />
        <div className="task-card__content">
          <input
            className="column__title-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ marginBottom: '0.5rem', fontWeight: 600 }}
          />
          <textarea
            className="column__title-input"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Description..."
            rows={2}
            style={{ marginBottom: '0.5rem', fontSize: '0.8125rem', resize: 'vertical' }}
          />
          <select
            className="column__title-input"
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
            style={{ marginBottom: '0.5rem', fontSize: '0.75rem' }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="board__add-btn"
              onClick={handleSave}
              style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
            >
              Save
            </button>
            <button
              className="column__menu-btn"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditDescription(task.description || '');
                setEditPriority(task.priority);
              }}
              style={{ padding: '0.375rem 0.75rem' }}
            >
              Cancel
            </button>
            <button
              className="column__menu-btn"
              onClick={handleDelete}
              style={{ padding: '0.375rem 0.75rem', color: '#ef4444' }}
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''}`}
      onClick={(e) => {
        // Don't open edit on drag click
        if ((e.target as HTMLElement).closest('.task-card__edit-btn')) return;
        setIsEditing(true);
      }}
    >
      <div
        className="task-card__priority-indicator"
        style={{ backgroundColor: priorityColor[task.priority] }}
      />
      
      <div className="task-card__content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h4 className="task-card__title">{task.title}</h4>
          <button
            className="task-card__edit-btn column__menu-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            style={{ padding: '0.125rem 0.375rem', fontSize: '0.75rem' }}
          >
            ✎
          </button>
        </div>
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
