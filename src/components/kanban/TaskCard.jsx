import React from 'react';
import { format } from 'date-fns';

const TaskCard = ({
  task,
  onMoveBack,
  onMoveForward,
  onEdit,
  onDelete,
  canMoveBack,
  canMoveForward,
  isDragging,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#ff4757';
      case 'medium':
        return '#ffa502';
      case 'low':
        return '#26de81';
      default:
        return '#747d8c';
    }
  };

  const formatDeadline = (deadline) => {
    try {
      return format(new Date(deadline), 'MMM dd, yyyy');
    } catch {
      return deadline;
    }
  };

  return (
    <div className={`task-card ${isDragging ? 'dragging' : ''}`}>
      <div className="task-header">
        <h4 className="task-name">{task.name}</h4>
        <span
          className="task-priority"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
      </div>

      <div className="task-deadline">
        <span className="deadline-icon">📅</span>
        <span>{formatDeadline(task.deadline)}</span>
      </div>

      <div className="task-actions">
        <button
          onClick={onMoveBack}
          disabled={!canMoveBack}
          className="action-btn"
          title="Move Back"
        >
          ←
        </button>
        <button
          onClick={onMoveForward}
          disabled={!canMoveForward}
          className="action-btn"
          title="Move Forward"
        >
          →
        </button>
        <button onClick={onEdit} className="action-btn edit" title="Edit">
          ✏️
        </button>
        <button onClick={onDelete} className="action-btn delete" title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
