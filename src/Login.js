import React, { useState } from 'react';
import './Auth.css';
import { ReactComponent as Logo } from './logo.svg';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        // Store user info and JWT token in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        window.location.href = "/dashboard"; // Redirect on success
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-logo">
          <Logo width={60} height={60} />
        </div>
        <h1 className="auth-title">Login to</h1>
        <h2 className="auth-subtitle">DataDolt</h2>
        <p className="auth-desc">Access your dashboard</p>
        <div className="auth-link">
          Don't have an account? <a href="/signup">Sign up here!</a>
        </div>
      </div>
      <div className="auth-right">
        <form className="auth-form-container" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Hello Again!</h2>
          <p className="auth-form-subtitle">Welcome Back</p>
          
          <div className="auth-form-group with-icon">
            <MdEmail className="input-icon" />
            <input
              className="auth-input"
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <div className="auth-form-group with-icon">
            <MdLock className="input-icon" />
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span
              className="auth-password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;