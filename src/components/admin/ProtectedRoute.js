import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token; // Returns true if token exists
  };

  if (!isAuthenticated()) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 