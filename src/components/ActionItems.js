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
        {actions.length === 0 ? (
          <div className="no-actions">Aucune action prioritaire</div>
        ) : (
          actions.map((action, index) => (
            ( (action.priority === 'high' || action.priority === 'Haute') && (action.status === 'En cours' || action.status === 'en cours' || action.status === 'In Progress') ) && (
              <div key={action._id || action.id || index} className="action-item">
                <div className="action-details">
                  <div className="action-title">{action.title}</div>
                  <div className="action-meta">
                    <div className="action-deadline">
                      <span className="calendar-icon">📅</span>
                      {action.dueDate}
                    </div>
                    <div className={`action-priority priority-${action.priority}`}
                      style={
                        (action.priority === 'high' || action.priority === 'Haute')
                          ? { color: '#e53935', fontWeight: 'bold', background: '#fdeaea', borderRadius: '8px', padding: '2px 10px', display: 'inline-block', fontSize: 13 }
                          : {}
                      }
                    >
                      {getPriorityText(action.priority)}
                    </div>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
    </div>
  );
};

export default ActionItems;