import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ isOpen, task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    priority: 'medium',
    deadline: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name || '',
        priority: task.priority || 'medium',
        deadline: task.deadline || ''
      });
    }
  }, [task]);

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
    
    onSave({ ...task, ...formData });
  };

  if (!isOpen || !task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-name">Task Name *</label>
            <input
              type="text"
              id="edit-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="edit-priority">Priority *</label>
            <select 
              id="edit-priority" 
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

          <div className="form-group">
            <label htmlFor="edit-deadline">Deadline *</label>
            <input
              type="date"
              id="edit-deadline"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="form-input"
            />
            {errors.deadline && <div className="field-error">{errors.deadline}</div>}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
