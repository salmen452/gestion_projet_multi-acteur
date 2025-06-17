import React, { useState } from 'react';
import { FaUsers, FaChartLine, FaHistory, FaCog, FaBars, FaTimes } from 'react-icons/fa';
import UserManagement from './components/admin/UserManagement';
import SystemMonitoring from './components/admin/SystemMonitoring';
import ActivityLogs from './components/admin/ActivityLogs';
import SystemSettings from './components/admin/SystemSettings';
import WorkGroups from './components/admin/WorkGroups';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sections = [
    { id: 'users', label: 'Gestion des acteurs', icon: <FaUsers /> },
    { id: 'groups', label: 'Groupes de travail', icon: <FaUsers /> },
    { id: 'monitoring', label: 'Monitoring système', icon: <FaChartLine /> },
    { id: 'logs', label: 'Journal d\'activité', icon: <FaHistory /> },
    { id: 'settings', label: 'Paramètres', icon: <FaCog /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'groups':
        return <WorkGroups />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'logs':
        return <ActivityLogs />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Administration</h2>
          <button
            className="toggle-sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="sidebar-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.icon}
              <span>{section.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{sections.find(s => s.id === activeSection)?.label}</h1>
        </header>
        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 