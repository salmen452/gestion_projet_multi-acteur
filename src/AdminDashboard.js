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
    { id: 'settings', label: 'Paramètres', icon: <FaCog /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="admin-logo-area">
          <div className="admin-logo-icon">AD</div>
          <div className="admin-logo-text">AdminPanel</div>
          {/* Removed sidebar close (X) button */}
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
        <div className="admin-sidebar-footer">
          <button
            className="action-button"
            style={{ width: '100%', background: '#F44336', color: '#fff', marginBottom: '1rem' }}
            onClick={() => {
              localStorage.removeItem('adminToken');
              window.location.href = 'http://localhost:3000/admin/login';
            }}
          >
            Se déconnecter
          </button>
          AdminPanel v1.0<br />
          © 2025 Tous droits réservés
        </div>
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