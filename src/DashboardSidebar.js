import React from 'react';
import { NavLink } from 'react-router-dom'; // Add this import
import './Dashboard.css';
import { FaHome, FaCalendarAlt, FaTasks, FaUsers, FaFileAlt, FaCog, FaQuestionCircle } from 'react-icons/fa';

const DashboardSidebar = ({ onParametreClick }) => {
  return (
    <nav className="dashboard-sidebar">
      <div className="logo-area">
        <div className="logo-icon">DD</div>
        <div className="logo-text">DataDolt</div>
      </div>
      
      <div className="nav-menu">
        <NavLink to="/dashboard" className="nav-item" activeClassName="active" exact>
          <FaHome className="nav-icon" />
          <span>Tableau de bord</span>
        </NavLink>
        <NavLink to="/meetings" className="nav-item" activeClassName="active">
          <FaCalendarAlt className="nav-icon" />
          <span>Réunions</span>
        </NavLink>
        <NavLink to="/actions" className="nav-item" activeClassName="active">
          <FaTasks className="nav-icon" />
          <span>Actions</span>
        </NavLink>
        <NavLink to="/documents" className="nav-item" activeClassName="active">
          <FaFileAlt className="nav-icon" />
          <span>Documents</span>
        </NavLink>
        <div className="nav-divider"></div>
        <div className="nav-item" style={{cursor: 'pointer'}} onClick={onParametreClick}>
          <FaCog className="nav-icon" />
          <span>Paramètres</span>
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