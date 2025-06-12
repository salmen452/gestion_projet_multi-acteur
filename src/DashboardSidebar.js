import React from 'react';
import './Dashboard.css';
import { FaHome, FaCalendarAlt, FaTasks, FaUsers, FaFileAlt, FaComments, FaBell, FaCog, FaQuestionCircle } from 'react-icons/fa';

const DashboardSidebar = () => {
  return (
    <nav className="dashboard-sidebar">
      <div className="logo-area">
        <div className="logo-icon">DD</div>
        <div className="logo-text">DataDolt</div>
      </div>
      
      <div className="nav-menu">
        <div className="nav-item active">
          <FaHome className="nav-icon" />
          <span>Tableau de bord</span>
        </div>
        <div className="nav-item">
          <FaCalendarAlt className="nav-icon" />
          <span>Réunions</span>
        </div>
        <div className="nav-item">
          <FaTasks className="nav-icon" />
          <span>Actions</span>
        </div>
        <div className="nav-item">
          <FaUsers className="nav-icon" />
          <span>Groupes de travail</span>
        </div>
        <div className="nav-item">
          <FaFileAlt className="nav-icon" />
          <span>Documents</span>
        </div>
        <div className="nav-divider"></div>
        <div className="nav-item">
          <FaComments className="nav-icon" />
          <span>Discussions</span>
        </div>
        <div className="nav-item">
          <FaBell className="nav-icon" />
          <span>Notifications</span>
        </div>
        <div className="nav-divider"></div>
        <div className="nav-item">
          <FaCog className="nav-icon" />
          <span>Paramètres</span>
        </div>
        <div className="nav-item">
          <FaQuestionCircle className="nav-icon" />
          <span>Aide & Support</span>
        </div>
      </div>
      
      <div className="sidebar-footer">
        DataDolt v1.0<br />
        © 2023 Tous droits réservés
      </div>
    </nav>
  );
};

export default DashboardSidebar;