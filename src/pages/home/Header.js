import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (mobileMenuOpen) {
      const closeMenu = (e) => {
        if (e.target.closest('.mobile-menu-toggle')) return;
        setMobileMenuOpen(false);
      };
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [mobileMenuOpen]);

  // Handle mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isLinkActive = (path) => {
    return location.pathname === path || 
           (path === '/' && (location.pathname === '/' || location.pathname === ''));
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
  {/* Logo Section */}
  <div className="logo-section" onClick={() => handleNavClick('/')}>
    <div className="logo-icon">
      <img src="/assets/LOGO.png" alt="Bharath Medicare Logo" />
    </div>
    <div className="logo-text">
      <span className="bharath">Bharath</span>
      <span className="medicare">MediCare</span>
    </div>
  </div>

        {/* Navigation Menu */}
        <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li className={`nav-item ${isLinkActive('/') ? 'active' : ''}`}>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('/')}
              >
                Home
              </button>
            </li>
            <li className={`nav-item ${isLinkActive('/about-us') ? 'active' : ''}`}>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('/about-us')}
              >
                About Us
              </button>
            </li>
            <li className={`nav-item ${isLinkActive('/services') ? 'active' : ''}`}>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('/services')}
              >
                Services
              </button>
            </li>
            <li className={`nav-item ${isLinkActive('/reviews') ? 'active' : ''}`}>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('/reviews')}
              >
                Reviews
              </button>
            </li>
            <li className={`nav-item ${isLinkActive('/contact-us') ? 'active' : ''}`}>
              <button 
                className="nav-link"
                onClick={() => handleNavClick('/contact-us')}
              >
                Contact Us
              </button>
            </li>
          </ul>
        </nav>

        {/* User Actions */}
        <div className="user-actions">
          {/* Login/Signup Button */}
          <button 
            className="login-signup-btn"
            onClick={() => handleNavClick('/landing-login')}
          >
            <i className="fas fa-user"></i>
            Login/Signup
          </button>
        </div>
        <div className="mobile-user-actions">
              <button 
                className="mobile-login-btn"
                onClick={() => handleNavClick('/barcode-scanner')}
              >
                <i className="fas fa-sign-in-alt"></i>
                Barcode
              </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Navigation */}
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                <li className={`mobile-nav-item ${isLinkActive('/') ? 'active' : ''}`}>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => handleNavClick('/')}
                  >
                    <i className="fas fa-home"></i>
                    Home
                  </button>
                </li>
                <li className={`mobile-nav-item ${isLinkActive('/about-us') ? 'active' : ''}`}>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => handleNavClick('/about-us')}
                  >
                    <i className="fas fa-info-circle"></i>
                    About Us
                  </button>
                </li>
                <li className={`mobile-nav-item ${isLinkActive('/services') ? 'active' : ''}`}>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => handleNavClick('/services')}
                  >
                    <i className="fas fa-medical-kit"></i>
                    Services
                  </button>
                </li>
                <li className={`mobile-nav-item ${isLinkActive('/reviews') ? 'active' : ''}`}>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => handleNavClick('/reviews')}
                  >
                    <i className="fas fa-star"></i>
                    Reviews
                  </button>
                </li>
                <li className={`mobile-nav-item ${isLinkActive('/contact-us') ? 'active' : ''}`}>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => handleNavClick('/contact-us')}
                  >
                    <i className="fas fa-envelope"></i>
                    Contact Us
                  </button>
                </li>
              </ul>
            </nav>

            {/* Mobile User Actions */}
            <div className="mobile-user-actions">
              <button 
                className="mobile-login-btn"
                onClick={() => handleNavClick('/landing-login')}
              >
                <i className="fas fa-sign-in-alt"></i>
                Login/Signup
              </button>
            </div>
            <div className="mobile-user-actions">
              <button 
                className="mobile-login-btn"
                onClick={() => handleNavClick('/barcode-scanner')}
              >
                <i className="fas fa-sign-in-alt"></i>
                Barcode
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
