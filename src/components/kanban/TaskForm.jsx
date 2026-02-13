import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 'medium',
    deadline: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Task name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Task name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Task name must not exceed 100 characters';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.deadline = 'Deadline must be a future date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      name: '',
      priority: 'medium',
      deadline: ''
    });
    setErrors({});
  };

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group flex-2">
            <label htmlFor="name">Task Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter task name"
              className="form-input"
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-group flex-1">
            <label htmlFor="priority">Priority *</label>
            <select 
              id="priority" 
              name="priority" 
              value={formData.priority}
              onChange={handleChange}
              className="form-input"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <div className="field-error">{errors.priority}</div>}
          </div>

          <div className="form-group flex-1">
            <label htmlFor="deadline">Deadline *</label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-input"
            />
            {errors.deadline && <div className="field-error">{errors.deadline}</div>}
          </div>

          <button type="submit" className="create-task-button">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
