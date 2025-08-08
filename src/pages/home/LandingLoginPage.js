import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LandingPageLogin.css';

function LandingLoginPage() {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'patient',
      title: 'Patient',
      description: 'Book appointments, view medical records, and manage your health',
      icon: 'fas fa-user-injured',
      color: '#6c757d',
      route: '/patient-login'
    },
    {
      type: 'doctor',
      title: 'Doctor',
      description: 'Manage patients, appointments, and medical consultations',
      icon: 'fas fa-user-md',
      color: '#00d084',
      route: '/doctor-login'
    },
    {
      type: 'hospital',
      title: 'Hospital',
      description: 'Manage staff, departments, and hospital operations',
      icon: 'fas fa-hospital',
      color: '#6f42c1',
      route: '/hospital-login'
    }
  ];

  const handleUserTypeSelect = (route) => {
    navigate(route);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="landing-login-page">
      <div className="landing-container">
        {/* Header Section */}
        <div className="landing-header">
          <button 
            className="back-button"
            onClick={handleBackToHome}
            aria-label="Back to home"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <div className="landing-logo-text">
              <span className="bharath">Bharath</span>
              <span className="medicare">MediCare</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="landing-content">
          <div className="landing-title">
            <h1>Welcome to BharathMediCare</h1>
            <p>Choose your role to get started with our healthcare platform</p>
          </div>

          <div className="user-type-grid">
            {userTypes.map((userType) => (
              <div
                key={userType.type}
                className={`user-type-card ${userType.type}`}
                onClick={() => handleUserTypeSelect(userType.route)}
                style={{ '--card-color': userType.color }}
              >
                <div className="card-icon">
                  <i className={userType.icon}></i>
                </div>
                <div className="card-content">
                  <h3>{userType.title}</h3>
                  <p>{userType.description}</p>
                </div>
                <div className="card-arrow">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            ))}
          </div>

          <div className="landing-footer">
            <p>New to our platform? Don't worry, you can create your account in the next step.</p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>
    </div>
  );
}

export default LandingLoginPage;
