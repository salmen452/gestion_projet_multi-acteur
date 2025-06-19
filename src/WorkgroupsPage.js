import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import './Dashboard.css';
import WorkGroups from './components/WorkGroups';
import { useNavigate } from 'react-router-dom';

const WorkgroupsPage = () => {
  const navigate = useNavigate();

  // Handler to view group details
  const handleViewGroup = (groupId) => {
    navigate(`/workgroups/${groupId}`);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Groupes de travail</h2>
        </div>
        
        <WorkGroups onViewGroup={handleViewGroup} />
      </main>
    </div>
  );
};

export default WorkgroupsPage;