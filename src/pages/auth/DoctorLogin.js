import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useClerk,
  useSignIn,
  useSignUp,
  useUser
} from '@clerk/clerk-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faCakeCandles
} from '@fortawesome/free-solid-svg-icons';
import './styles/CommonLogin.css';

export default function DoctorLogin() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [isLogin, setIsLogin] = useState(true);
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [signupPasswordVisible, setSignupPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: '',
    doctorId: '',
    email: '',
    specialization: '',
    password: '',
  });

  useState(() => {
    const savedId = localStorage.getItem('doctorId');
    if (savedId) {
      setLoginIdentifier(savedId);
      setRememberMe(true);
    }
  }, []);

  const resetForms = () => {
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginPasswordVisible(false);
    setSignupData({
      fullName: '',
      doctorId: '',
      email: '',
      specialization: '',
      password: '',
    });
    setSignupPasswordVisible(false);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    resetForms();
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setSignupData(prev => ({ ...prev, [id]: value }));
    setErrorMessage('');
  };

  const toggleLoginPasswordVisibility = () => setLoginPasswordVisible(prev => !prev);
  const toggleSignupPasswordVisibility = () => setSignupPasswordVisible(prev => !prev);

  const validateSignup = () => {
    const { fullName, email, specialization, password } = signupData;
    if (!fullName?.trim()) {
      setErrorMessage('Please enter a valid full name');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!specialization?.trim()) {
      setErrorMessage('Please enter your specialization');
      return false;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      setErrorMessage('Password must be 8+ characters, include upper/lowercase, number, and special character');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    if (!loginIdentifier || !loginPassword) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }
    try {
      const result = await signIn.create({
        identifier: loginIdentifier,
        password: loginPassword,
      });
      if (result.status === 'complete' && result.createdSessionId) {
        if (rememberMe) {
          localStorage.setItem('doctorId', loginIdentifier);
        } else {
          localStorage.removeItem('doctorId');
        }
        navigate('/doctor-dashboard');
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    if (!validateSignup()) {
      setLoading(false);
      return;
    }
    try {
      const result = await signUp.create({
        emailAddress: signupData.email,
        password: signupData.password,
        unsafeMetadata: {
          role: 'doctor',
          fullName: signupData.fullName,
          doctorId: signupData.doctorId,
          specialization: signupData.specialization,
        },
      });
      if (result.status === 'complete') {
        setErrorMessage('Account created! Please check your email to verify.');
        toggleForm();
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setErrorMessage(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/doctor-oauth-callback',
      });
    } catch (err) {
      console.error('Google sign-in failed:', err);
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <FontAwesomeIcon icon={faUser} />, text: 'View patient analytics' },
    { icon: <FontAwesomeIcon icon={faEnvelope} />, text: 'Manage appointments' },
    { icon: <FontAwesomeIcon icon={faCakeCandles} />, text: 'Prescribe medications' },
  ];

  if (isLoaded && isSignedIn) {
    navigate('/doctor-dashboard');
    return null;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Sidebar */}
        <div className="auth-sidebar">
          <div className="brand-container">
            <img src="/assets/LOGO.png" alt="Bharath MediCare Logo" className="logo" />
            <h1 className="brand-name">Bharath MediCare</h1>
          </div>
          <div className="sidebar-content">
            <h2 className="welcome-text">Doctor Portal</h2>
            <p className="sidebar-message">Access patient records, manage schedules, and coordinate care.</p>
            <div className="feature-list">
              {features.map((feat, i) => (
                <div className="feature-item" key={i}>
                  <div className="feature-icon">{feat.icon}</div>
                  <div className="feature-text">{feat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">{isLogin ? 'Welcome Back, Doctor' : 'Create Doctor Account'}</h2>
            <p className="auth-subtitle">{isLogin ? 'Sign in to your dashboard' : 'Register to join our network'}</p>
          </div>

          {/* Toggle Buttons */}
          <div className="toggle-container">
            <button className={`toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
            <button className={`toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>

          {/* Error Message */}
          {errorMessage && <div className="simple-error-message">{errorMessage}</div>}

          {/* Forms */}
          <div className="auth-form-wrapper">
            {/* No LoadingOverlay, just show "Loading..." if needed */}
            {loading && <div className="simple-loading-overlay">Loading...</div>}

            {isLogin ? (
              <form onSubmit={handleLogin} className="auth-form login-form">
                <div className="form-group">
                  <label htmlFor="loginIdentifier">Doctor ID or Email</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
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
                    <span className="input-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <input
                      type={loginPasswordVisible ? "text" : "password"}
                      id="loginPassword"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    {/* Removed PasswordToggle, replaced with simple toggle */}
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={toggleLoginPasswordVisibility}
                      tabIndex={-1}
                      style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={loginPasswordVisible ? 'eye-slash' : 'eye'} />
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember Me
                  </label>
                  <a href="/doctor/forgot-password" className="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>Sign In</button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="auth-form signup-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
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

                <div className="form-group">
                  <label htmlFor="doctorId">Doctor ID</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
                    <input
                      type="text"
                      id="doctorId"
                      value={signupData.doctorId}
                      onChange={handleSignupChange}
                      placeholder="Your unique ID"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
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

                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faUser} /></span>
                    <input
                      type="text"
                      id="specialization"
                      value={signupData.specialization}
                      onChange={handleSignupChange}
                      placeholder="Your field"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Create Password</label>
                  <div className="input-container">
                    <span className="input-icon"><FontAwesomeIcon icon={faLock} /></span>
                    <input
                      type={signupPasswordVisible ? "text" : "password"}
                      id="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      placeholder="Create a secure password"
                      required
                    />
                    {/* Removed PasswordToggle, replaced with simple toggle */}
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={toggleSignupPasswordVisibility}
                      tabIndex={-1}
                      style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <FontAwesomeIcon icon={signupPasswordVisible ? 'eye-slash' : 'eye'} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>Create Account</button>
              </form>
            )}

            <div className="divider"><span>OR</span></div>

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