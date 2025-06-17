import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';

const DocumentsPage = () => {
  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Documents</h2>
        </div>
        
        {/* Documents content will go here */}
        <div className="dashboard-card">
          <div className="card-header">
            <div className="card-title">Documents partagés</div>
          </div>
          <div className="card-body">
            <p>Contenu des documents à venir...</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentsPage;