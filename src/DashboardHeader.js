import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const DashboardHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Get user info from localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}
  const userName = user?.name || user?.username || user?.email || 'Utilisateur';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);

  return (
    <header className="dashboard-header">
      <div className="header-title">Tableau de bord de coordination</div>
      <div className="header-actions">
        <div className="user-profile" ref={dropdownRef} onClick={() => setDropdownOpen(v => !v)} style={{cursor: 'pointer', position: 'relative'}}>
          <div className="user-avatar">{userInitials}</div>
          <div>{userName}</div>
          {dropdownOpen && (
            <div className="user-dropdown">
              <button className="dropdown-item" onClick={handleLogout}>Déconnexion</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;