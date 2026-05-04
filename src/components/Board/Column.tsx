'use client';

import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useStore } from '@/store/useStore';
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
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

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

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: `task-${Date.now()}`,
      columnId: column.id,
      boardId: column.boardId,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      tags: [],
      order: tasks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    useStore.getState().addTask(newTask);
    setNewTaskTitle('');
    setNewTaskPriority('medium');
    setIsAddingTask(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleAddTask();
    if (e.key === 'Escape') {
      setIsAddingTask(false);
      setNewTaskTitle('');
    }
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
        
        {isAddingTask ? (
          <div className="task-card task-card--editing">
            <input
              className="column__title-input"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Task title..."
              autoFocus
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <select
                className="column__title-input"
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value as 'low' | 'medium' | 'high')}
                style={{ flex: 1, fontSize: '0.75rem' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                className="board__add-btn"
                onClick={handleAddTask}
                style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
              >
                Add
              </button>
              <button
                className="column__menu-btn"
                onClick={() => {
                  setIsAddingTask(false);
                  setNewTaskTitle('');
                }}
                style={{ padding: '0.375rem 0.75rem' }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="column__add-task-btn" onClick={() => setIsAddingTask(true)}>
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
};

export default Column;
