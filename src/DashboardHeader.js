import React from 'react';
import './Dashboard.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="header-title">Tableau de bord de coordination</div>
      <div className="header-actions">
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Rechercher..." />
        </div>
        <div className="notification">
          <span className="bell-icon">🔔</span>
          <span className="notification-badge">3</span>
        </div>
        <div className="user-profile">
          <div className="user-avatar">AD</div>
          <div>Admin User</div>
          <span className="chevron">▼</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;