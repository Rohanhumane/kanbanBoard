import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, taskName }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="modal-body">
          <p>Are you sure you want to delete the task:</p>
          <strong>"{taskName}"</strong>
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={onConfirm} className="delete-confirm-button">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
