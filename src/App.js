import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard'; // Add this
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add this */}
      </Routes>
    </Router>
  );
}

export default App;