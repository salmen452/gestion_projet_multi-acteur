import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';

const MeetingsPage = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Réunions</h2>
        </div>
        
        {/* Meetings content will go here */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Liste des réunions</div>
          </div>
          <div className="card-body">
            <p>Contenu des réunions à venir...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MeetingsPage;