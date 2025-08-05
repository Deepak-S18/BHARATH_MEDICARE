// Header.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./styles/Header.css"; // Assuming you have a CSS file for additional styles

const Header = ({ scrolled, isLinkActive, mobileMenuOpen, toggleMobileMenu }) => {
  const navigate = useNavigate();

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="nav-left"
        >
          <a href="/" className="logo-container">
            <img src="/assets/LOGO.png" alt="Bharath MediCare Logo" className="large-logo" />
            <div className="brand">
              <span className="saffron">Bharath</span>
              <span className="green">MediCare</span>
            </div>
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="nav-center"
        >
          <nav className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
  {[
    { path: '/', name: 'Home' },
    { path: '/about-us', name: 'About Us' },
    { path: '/services', name: 'Services' },
    { path: '/reviews', name: 'Reviews' },
    { path: '/contact-us', name: 'Contact Us' },
  ].map(({ path, name }) => (
    <a
      key={path}
      href={path}
      className={isLinkActive(path) ? 'active' : ''}
      onClick={(e) => {
        e.preventDefault();
        navigate(path);
      }}
    >
      {name}
    </a>
  ))}
</nav>
        </motion.div>

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="nav-right"
        >
          <div className="auth-buttons">
            <button className="access-btn NFCPatient-btn" onClick={() => navigate("/NFCPatientScanner")}>
              <i className="fa-solid fa-id-card"></i> Scan Card
            </button>
            <button className="access-btn patient-btn" onClick={() => navigate("/patient-login")}>
              <i className="fas fa-user-circle"></i> Patient
            </button>
            <button className="access-btn doctor-btn" onClick={() => navigate("/doctor-login")}>
              <i className="fas fa-stethoscope"></i> Doctor
            </button>
            <button className="access-btn hospital-btn" onClick={() => navigate("/hospital-login")}>
              <i className="fas fa-hospital"></i> Hospital
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;