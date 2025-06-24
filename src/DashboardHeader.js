import React from 'react';
import './Dashboard.css';

const DashboardHeader = () => {
  return (
    <header className="dashboard-header">
      <div className="header-title">Tableau de bord de coordination</div>
      <div className="header-actions">
        <div className="user-profile">
          <div className="user-avatar">US</div>
          <div>User</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;