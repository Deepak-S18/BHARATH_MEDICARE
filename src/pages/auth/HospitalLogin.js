import React, { useState, useEffect } from 'react';
import './styles/CommonLogin.css'; // Reusing the same CSS file
import { auth } from '../../config/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function HospitalLogin() {
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Check localStorage on page load
  useEffect(() => {
    const savedHospitalId = localStorage.getItem('hospitalId');
    if (savedHospitalId) {
      setLoginIdentifier(savedHospitalId);
      setRememberMe(true);
    }
  }, []);

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!loginIdentifier || !loginPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/hospital/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        if (rememberMe) {
          localStorage.setItem('hospitalId', loginIdentifier);
        } else {
          localStorage.removeItem('hospitalId');
        }
        window.location.href = '/hospital/dashboard';
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('hospitalId', user.email);
      window.location.href = '/hospital/dashboard';
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setErrorMessage('Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  // Password Visibility Toggle
  const togglePasswordVisibility = (inputId) => {
    setPasswordVisible(!passwordVisible);
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="animated-shape shape1"></div>
        <div className="animated-shape shape2"></div>
        <div className="animated-shape shape3"></div>
      </div>
      
      <div className="auth-card">
        <div className="auth-sidebar">
          <div className="brand-container">
            <img src="/LOGO.png" alt="Bharath MediCare Logo" className="logo" />
            <h1 className="brand-name">Bharath MediCare</h1>
          </div>
          <div className="sidebar-content">
            <h2 className="welcome-text">Hospital Administration Portal</h2>
            <p className="sidebar-message">Manage your hospital operations, staff, and patient care from one central dashboard.</p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">🏥</div>
                <div className="feature-text">Manage hospital resources</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👥</div>
                <div className="feature-text">Coordinate staff schedules</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div className="feature-text">Monitor hospital metrics</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">Welcome Back, Administrator</h2>
            <p className="auth-subtitle">Sign in to access your hospital dashboard</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-container">
              <div className="error-icon">⚠️</div>
              <div className="error-text">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <div className="auth-form-wrapper">
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner">
                  <div className="spinner-inner"></div>
                </div>
                <p>Please wait...</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form login-form">
              <div className="form-group">
                <label htmlFor="loginIdentifier">Hospital ID or Email</label>
                <div className="input-container">
                  <span className="input-icon">🏥</span>
                  <input
                    type="text"
                    id="loginIdentifier"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Enter your hospital ID or email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="input-container">
                  <span className="input-icon">🔒</span>
                  <input
                    type="password"
                    id="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('loginPassword')}
                  >
                    {passwordVisible ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <a href="/hospital/forgot-password" className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                Sign In
              </button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
              <img src="/google-icon.png" alt="Google Icon" className="google-icon" />
              <span>Continue with Google</span>
            </button>
          </div>
          
          <div className="auth-footer">
            <p>
              Don't have an account?
              <a href="hospital-registration" className="toggle-link">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HospitalLogin;