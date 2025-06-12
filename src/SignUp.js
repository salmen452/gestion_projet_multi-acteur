import React, { useState } from 'react';
import './Auth.css';
import { ReactComponent as Logo } from './logo.svg';
import { MdEmail, MdPerson, MdPhone, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        <form className="auth-form-container">
          <h2 className="auth-form-title">Hello!</h2>
          <p className="auth-form-subtitle">Sign Up to Get Started</p>
          
          <div className="auth-form-group with-icon">
            <MdEmail className="input-icon" />
            <input
              className="auth-input"
              type="email"
              placeholder="Enter Email"
              required
            />
          </div>
          
          <div className="auth-form-group with-icon">
            <MdPerson className="input-icon" />
            <input
              className="auth-input"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="auth-form-group with-icon">
            <MdPhone className="input-icon" />
            <input
              className="auth-input"
              type="text"
              placeholder="Contact number"
              required
            />
          </div>
          
          <div className="auth-form-group with-icon">
            <MdLock className="input-icon" />
            <input
              className="auth-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
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
              placeholder="Confirm Password"
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
          
          <button className="auth-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;