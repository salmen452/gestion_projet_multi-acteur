import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ProtectedRouteUser from './components/ProtectedRoute';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import MeetingsPage from './MeetingsPage'; // Add this
import ActionsPage from './ActionsPage'; // Add this
import DocumentsPage from './DocumentsPage'; // Add this
import UserActionsStats from './UserActionsStats';
import './App.css';

const GroupDetail = () => {
  return (
    <div style={{padding: '2rem'}}>
      <h2>Détail du groupe</h2>
      <p>Page de détail du groupe à venir...</p>
    </div>
  );
};

const AdminRedirect = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  };

  if (isAuthenticated()) {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/admin/login" replace />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRouteUser>
            <Dashboard />
          </ProtectedRouteUser>
        } />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Add the new routes */}
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/actions" element={<ActionsPage />} />
        <Route path="/user-actions-stats" element={<UserActionsStats />} />
        <Route path="/workgroups/:id" element={<GroupDetail />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
