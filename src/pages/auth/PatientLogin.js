import React, { useState } from 'react';
import axios from 'axios';
import './styles/PatientLogin.css';
import { auth } from '../../config/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faLock, 
  faEnvelope, 
  faPhone, 
  faCakeCandles, 
  faEye, 
  faEyeSlash,
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';

function PatientLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);

  const [signupData, setSignupData] = useState({
    fullName: '',
    patientId: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
  });

  // Toggle between Login and Signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    resetForms();
  };

  // Reset form fields
  const resetLoginForm = () => {
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginPasswordVisible(false);
  };

  const resetSignupForm = () => {
    setSignupData({
      fullName: '',
      patientId: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      password: '',
    });
    setSignupPasswordVisible(false);
  };

  const resetForms = () => {
    resetLoginForm();
    resetSignupForm();
  };

  // Handle Signup Input Change
  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData(prevData => ({ ...prevData, [id]: value }));
    setErrorMessage(''); // Clear any previous error messages
  };

  // Password Visibility Toggle - separate toggles for login and signup
  const toggleLoginPasswordVisibility = () => {
    setLoginPasswordVisible(prev => !prev);
  };

  const toggleSignupPasswordVisibility = () => {
    setSignupPasswordVisible(prev => !prev);
  };

  // Validate Signup Details
  const validateSignup = () => {
    const { fullName, email, phone, dateOfBirth, password } = signupData;
  
    // Trim inputs
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.replace(/\D/g, '');

    // Name validation
    if (trimmedFullName.length < 2) {
      setErrorMessage('Please enter a valid full name');
      return false;
    }

    // Email validation with more robust regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }

   // Phone validation (more flexible international format)
   const phoneRegex = /^\+?[0-9]{7,15}$/; // Allows 7-15 digits with optional + prefix
   if (!phoneRegex.test(trimmedPhone)) {
     setErrorMessage('Please enter a valid phone number (7-15 digits)');
      return false;
    }

    // Date of Birth validation
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const maxAge = 120; // Maximum reasonable age
    const ageInYears = (currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000);

    if (isNaN(birthDate.getTime())) {
      setErrorMessage('Please enter a valid date of birth');
      return false;
    }

    if (ageInYears > maxAge) {
      setErrorMessage(`Age must be below ${maxAge} years`);
      return false;
    }

    // Password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage('Password must be 8+ characters, include uppercase, lowercase, number, and special character');
      return false;
    }

    return true;
  };

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword }),
      });

      const result = await response.json();
      console.log('Login response:', result);
      
      if (result.status === 'success') {
        // Store auth token if provided
        if (result.token) {
          localStorage.setItem('authToken', result.token);
        }
        
        // Store patient info for "Remember Me"
        if (rememberMe && result.patient) {
          localStorage.setItem('patientInfo', JSON.stringify(result.patient));
        }
        
        console.log('Login successful, redirecting...');
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.replace('/patient-dashboard');
        }, 500);
      } else {
        setErrorMessage(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error details:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup Submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    // Validate signup details before submission
    if (!validateSignup()) {
      setLoading(false);
      return;
    }

    try {
      // Let server handle ID generation
      const response = await axios.post('http://localhost:5000/patient/signup', signupData);

      if (response.data.status === 'success') {
        // Account created successfully
        setErrorMessage('Account created successfully! Please log in.');
        toggleForm(); // Switch to login
      } else {
        setErrorMessage(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Additional steps to link Google account with patient signup
      const googleSignupResponse = await axios.post('http://localhost:5000/patient/google-signup', {
        email: user.email,
        fullName: user.displayName,
        googleId: user.uid
      });

      if (googleSignupResponse.data.status === 'success') {
        localStorage.setItem('patientId', user.email);
        window.location.href = '/patient-dashboard';
      } else {
        setErrorMessage(googleSignupResponse.data.message || 'Google sign-in failed');
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <img src="/assets/LOGO.png" alt="Bharath MediCare Logo" className="logo" />
            <h1 className="brand-name">Bharath MediCare</h1>
          </div>
          <div className="sidebar-content">
            <h2 className="welcome-text">Patient Healthcare Portal</h2>
            <p className="sidebar-message">Access your medical records, book appointments, and connect with your healthcare providers.</p>
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="feature-text">View your medical history</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="feature-text">Schedule appointments</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="feature-text">Communicate with doctors</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">{isLogin ? 'Welcome Back, Patient' : 'Create Your Patient Account'}</h2>
            <p className="auth-subtitle">{isLogin ? 'Sign in to access your health portal' : 'Register to manage your healthcare journey'}</p>
          </div>

          {/* Toggle Buttons */}
          <div className="toggle-container">
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-container">
              <div className="error-icon">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <div className="error-text">{errorMessage}</div>
            </div>
          )}

          {/* Forms */}
          <div className="auth-form-wrapper">
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner">
                  <div className="spinner-inner"></div>
                </div>
                <p>Please wait...</p>
              </div>
            )}

            {isLogin ? (
              <form onSubmit={handleLogin} className="auth-form login-form">
                <div className="form-group">
                  <label htmlFor="loginIdentifier">Patient ID or Email</label>
                  <div className="input-container">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="text"
                      id="loginIdentifier"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="Enter your ID or email"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="loginPassword">Password</label>
                  <div className="input-container">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type={loginPasswordVisible ? "text" : "password"}
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={toggleLoginPasswordVisibility}
                    >
                      <FontAwesomeIcon icon={loginPasswordVisible ? faEyeSlash : faEye} />
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
                  <a href="/patient/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form signup-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-container">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input 
                      type="text" 
                      id="fullName" 
                      value={signupData.fullName} 
                      onChange={handleSignupChange} 
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group half">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-container">
                      <span className="input-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </span>
                      <input 
                        type="email" 
                        id="email" 
                        value={signupData.email} 
                        onChange={handleSignupChange} 
                        placeholder="Enter your email"
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-group half">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-container">
                      <span className="input-icon">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      <input 
                        type="text" 
                        id="phone" 
                        value={signupData.phone} 
                        onChange={handleSignupChange} 
                        placeholder="Your phone number"
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <div className="input-container">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faCakeCandles} />
                    </span>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      value={signupData.dateOfBirth} 
                      onChange={handleSignupChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Create Password</label>
                  <div className="input-container">
                    <span className="input-icon">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input 
                      type={signupPasswordVisible ? "text" : "password"} 
                      id="password" 
                      value={signupData.password} 
                      onChange={handleSignupChange} 
                      placeholder="Create a secure password"
                      required 
                    />
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={toggleSignupPasswordVisibility}
                    >
                      <FontAwesomeIcon icon={signupPasswordVisible ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  Create Account
                </button>
              </form>
            )}

            <div className="divider">
              <span>OR</span>
            </div>

            <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading}>
              <img src="/assets/google-icon.png" alt="Google Icon" className="google-icon" />
              <span>Continue with Google</span>
            </button>
          </div>
          
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button type="button" className="toggle-link" onClick={toggleForm}>
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;