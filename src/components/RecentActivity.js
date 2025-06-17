import React from 'react';
import '../Dashboard.css';

const RecentActivity = ({ activities }) => {
  return (
    <div className="dashboard-card">
      <div className="card-header">
        <div className="card-title">
          <span className="card-icon">🔄</span>
          Activité récente
        </div>
        <div className="card-actions">
        </div>
      </div>
      <div className="card-body">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div className="activity-icon">
              {activity.icon}
            </div>
            <div className="activity-details">
              <div className="activity-text">
                <strong>{activity.user}</strong> {activity.description}
              </div>
              <div className="activity-time">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;