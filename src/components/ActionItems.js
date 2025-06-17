import React from 'react';
import '../Dashboard.css';

const ActionItems = ({ actions }) => {
  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Faible';
      default: return priority;
    }
  };

  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-title">
          <span className="card-icon">✅</span>
          Actions prioritaires
        </div>
        <div className="card-actions">
        </div>
      </div>
      <div className="card-body">
        {actions.map((action, index) => (
          <div key={index} className="action-item">
            <div className="action-checkbox">
              <input 
                type="checkbox" 
                checked={action.status === 'completed'} 
                readOnly 
              />
            </div>
            <div className="action-details">
              <div className="action-title">{action.title}</div>
              <div className="action-meta">
                <div className="action-deadline">
                  <span className="calendar-icon">📅</span>
                  {action.dueDate}
                </div>
                <div className={`action-priority priority-${action.priority}`}>
                  {getPriorityText(action.priority)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionItems;