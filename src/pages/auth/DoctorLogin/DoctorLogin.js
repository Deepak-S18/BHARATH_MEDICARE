import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faCakeCandles,
  faEye,
  faEyeSlash,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import './DoctorLogin.css'; // Use same or adapted CSS from PatientLogin.css

function DoctorLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    loginIdentifier: '',
    loginPassword: '',
    fullName: '',
    doctorId: '',
    email: '',
    specialization: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.loginIdentifier || !formData.loginPassword) {
        setErrorMessage('Please fill in all fields');
        return false;
      }
    } else {
      const { fullName, doctorId, email, specialization, password } = formData;
      if (!fullName.trim() || fullName.trim().length < 2) {
        setErrorMessage('Please enter a valid full name');
        return false;
      }
      if (!doctorId.trim()) {
        setErrorMessage('Please enter your doctor ID');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage('Please enter a valid email address');
        return false;
      }
      if (!specialization.trim()) {
        setErrorMessage('Please enter your specialization');
        return false;
      }
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        setErrorMessage('Password must be 8+ characters with uppercase, lowercase, number, and special character');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call or use your auth logic here
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (isLogin) {
        console.log('Doctor login attempt:', {
          identifier: formData.loginIdentifier,
          password: formData.loginPassword
        });
        // Redirect or further processing here
        window.location.href = '/doctor-dashboard';
      } else {
        console.log('Doctor signup attempt:', formData);
        setErrorMessage('Account created successfully! Please log in.');
        setIsLogin(true);
        setFormData(prev => ({ ...prev, fullName: '', doctorId: '', email: '', specialization: '', password: '' }));
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
    setErrorMessage('Google sign-in feature coming soon!');
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setFormData({
      loginIdentifier: '',
      loginPassword: '',
      fullName: '',
      doctorId: '',
      email: '',
      specialization: '',
      password: ''
    });
    setPasswordVisible(false);
  };

  return (
    <div className="patient-login-container">
      <div className="login-card">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="brand-section">
            <div className="logo-container">
              <img src="/assets/LOGO.png" alt="Bharath MediCare" className="logo" />
              <h1 className="brand-name">Bharath MediCare</h1>
            </div>
          </div>
          <div className="sidebar-content">
            <h2 className="portal-title">Doctor Portal</h2>
            <p className="portal-description">
              Access patient records, manage schedules, and coordinate care.
            </p>
            <div className="features">
              <div className="feature">
                <FontAwesomeIcon icon={faUser} className="feature-icon" />
                <span>View patient analytics</span>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faEnvelope} className="feature-icon" />
                <span>Manage appointments</span>
              </div>
              <div className="feature">
                <FontAwesomeIcon icon={faCakeCandles} className="feature-icon" />
                <span>Prescribe medications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="form-title">{isLogin ? 'Welcome Back, Doctor' : 'Create Doctor Account'}</h2>
            <p className="form-subtitle">{isLogin ? 'Sign in to your dashboard' : 'Register to join our network'}</p>
          </div>

          {/* Toggle Buttons */}
          <div className="toggle-buttons">
            <button
              type="button"
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-message">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {loading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>Please wait...</p>
              </div>
            )}

            {isLogin ? (
              <>
                <div className="form-group">
                  <label>Doctor ID or Email</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      name="loginIdentifier"
                      value={formData.loginIdentifier}
                      onChange={handleInputChange}
                      placeholder="Enter your ID or email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="loginPassword"
                      value={formData.loginPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember Me</span>
                  </label>
                  <a href="/doctor/forgot-password" className="forgot-link">Forgot Password?</a>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Doctor ID</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      name="doctorId"
                      value={formData.doctorId}
                      onChange={handleInputChange}
                      placeholder="Your unique ID"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Specialization</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      placeholder="Your field"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Create Password</label>
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a secure password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                      aria-label="Toggle password visibility"
                    >
                      <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>
              </>
            )}

            <button type="submit" className="submit-button" disabled={loading}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button type="button" className="google-button" onClick={handleGoogleSignIn}>
            <img src="/assets/google-icon.png" alt="Google" className="google-icon" />
            <span>Continue with Google</span>
          </button>

          <div className="form-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" className="link-button" onClick={toggleForm}>
                {isLogin ? " Sign up" : " Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
