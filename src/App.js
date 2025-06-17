import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';
import MeetingsPage from './MeetingsPage'; // Add this
import ActionsPage from './ActionsPage'; // Add this
import WorkgroupsPage from './WorkgroupsPage'; // Add this
import DocumentsPage from './DocumentsPage'; // Add this
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin routes */}
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
        <Route path="/workgroups" element={<WorkgroupsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;