import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../../AdminDashboard.css';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Temporary hardcoded credentials for testing
    if (credentials.email === "admin@gmail.com" && credentials.password === "admin123") {
      localStorage.setItem('adminToken', 'dummy_token');
      window.location.href = '/admin/dashboard';
    } else {
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <FaLock className="admin-login-icon" />
          <h1>Administration</h1>
          <p>Connectez-vous pour accéder au panneau d'administration</p>
        </div>

        {error && (
          <div className="admin-login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={credentials.email}
              onChange={(e) => setCredentials({
                ...credentials,
                email: e.target.value
              })}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mot de passe</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                value={credentials.password}
                onChange={(e) => setCredentials({
                  ...credentials,
                  password: e.target.value
                })}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login-button">
            Se connecter
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="back-to-site">
            Retour au site principal
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin; 