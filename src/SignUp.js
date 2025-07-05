import React, { useState } from 'react';
import './Auth.css';
import { ReactComponent as Logo } from './logo.svg';
import { MdEmail, MdPerson, MdPhone, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    email: '',
    prenom: '',
    nom: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.prenom + ' ' + form.nom,
          phone: form.phone,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Auto-login after successful signup
        setMessage('Registration successful! Logging you in...');
        // Try to login with the same credentials
        try {
          const loginRes = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: form.email, password: form.password })
          });
          const loginData = await loginRes.json();
          if (loginRes.ok) {
            localStorage.setItem('user', JSON.stringify(loginData.user));
            if (loginData.token) {
              localStorage.setItem('token', loginData.token);
            }
            setTimeout(() => navigate('/dashboard'), 800);
          } else {
            setMessage('Registered, but failed to log in. Please log in manually.');
            setTimeout(() => navigate('/login'), 1200);
          }
        } catch (err) {
          setMessage('Registered, but failed to log in. Please log in manually.');
          setTimeout(() => navigate('/login'), 1200);
        }
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (err) {
      setMessage('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-logo">
          <Logo width={60} height={60} />
        </div>
        <h1 className="auth-title">Sign Up to</h1>
        <h2 className="auth-subtitle">DataDolt</h2>
        <p className="auth-desc">Create your account to get started</p>
        <div className="auth-link">
          Already have an account? <a href="/login">Login here!</a>
        </div>
      </div>
      <div className="auth-right">
        <form className="auth-form-container" onSubmit={handleSubmit}>
          <h2 className="auth-form-title">Hello!</h2>
          <p className="auth-form-subtitle">Sign Up to Get Started</p>

          {message && <div className="auth-message">{message}</div>}

          <div className="auth-form-group with-icon">
            <MdEmail className="input-icon" />
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group with-icon">
            <MdPerson className="input-icon" />
            <input
              className="auth-input"
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={form.prenom}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-form-group with-icon">
            <MdPerson className="input-icon" />
            <input
              className="auth-input"
              type="text"
              name="nom"
              placeholder="Nom"
              value={form.nom}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group with-icon">
            <MdPhone className="input-icon" />
            <input
              className="auth-input"
              type="text"
              name="phone"
              placeholder="Contact number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group with-icon">
            <MdLock className="input-icon" />
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
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

          <div className="auth-form-group with-icon">
            <MdLock className="input-icon" />
            <input
              className="auth-input"
              type={showConfirm ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="auth-password-toggle"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={0}
              role="button"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirm ? <MdVisibilityOff /> : <MdVisibility />}
            </span>
          </div>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;