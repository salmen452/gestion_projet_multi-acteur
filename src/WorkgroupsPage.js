import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';

const WorkgroupsPage = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Groupes de travail</h2>
        </div>
        
        {/* Workgroups content will go here */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Liste des groupes</div>
          </div>
          <div className="card-body">
            <p>Contenu des groupes de travail à venir...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkgroupsPage;