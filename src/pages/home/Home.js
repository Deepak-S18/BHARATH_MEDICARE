import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from './Header';
import Footer from './Footer';


function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider images
  const sliderImages = [
    "/assets/hero-image1.png",
    "/assets/hero-image2.png",
    "/assets/hero-image3.png",
    "/assets/hero-image4.png",
    "/assets/hero-image5.png"
  ];
  
  

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
  
  // Implement auto-slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Function to change slide manually
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = (e) => {
    e.stopPropagation(); // Prevent event from bubbling
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isLinkActive = (path) => {
    // Exact match or if it's a root path (/) for matching variations
    return location.pathname === path || 
           (path === '/' && (location.pathname === '/' || location.pathname === ''));
  };

  return (
    <div className="base-page-container">
       <Header 
      scrolled={scrolled}
      isLinkActive={isLinkActive}
      mobileMenuOpen={mobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
    />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
        >
          <h1>Transform Your Healthcare Experience</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Digitalizing Healthcare, Simplifying Lives</p>
            <p className="sub-tagline">India's largest integrated healthcare platform</p>
          </div>
          
          {/* Quick Access Cards */}
          <div className="quick-access-cards">
            <motion.div 
              className="quick-card"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              onClick={() => navigate("/find-doctors")}
            >
              <i className="fas fa-user-md"></i>
              <span>Find Doctors</span>
            </motion.div>
            
            <motion.div 
              className="quick-card"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              onClick={() => navigate("/appointment")}
            >
              <i className="fas fa-calendar-check"></i>
              <span>Book Appointment</span>
            </motion.div>
            
            <motion.div 
              className="quick-card"
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              onClick={() => navigate("/view-records")}
            >
              <i className="fas fa-file-medical"></i>
              <span>Health Records</span>
            </motion.div>
          </div>
          
          <div className="hero-cta">
            <button className="cta-button primary" onClick={() => navigate("/get-started")}>
              Get Started
            </button>
            <button className="cta-button secondary" onClick={() => navigate("/learn-more")}>
              Learn More
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="hero-image-container"
        >
          {/* Image slider */}
          <div className="slider-container">
            {sliderImages.map((img, index) => (
              <div 
                key={index}
                className={`slide ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
            
            {/* Slider Navigation */}
            <div className="slider-navigation">
              {sliderImages.map((_, index) => (
                <div 
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></div>
              ))}
            </div>
            
            {/* Slider Arrows */}
            <div 
              className="slider-arrow left"
              onClick={() => goToSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length)}
            >
              <i className="fas fa-chevron-left"></i>
            </div>
            <div 
              className="slider-arrow right"
              onClick={() => goToSlide((currentSlide + 1) % sliderImages.length)}
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Hospitals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Doctors</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Patients</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="services" className="features-section">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive healthcare solutions for patients, doctors, and hospitals</p>
        
        <div className="features-grid">
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="feature-icon">
              <i className="fas fa-hospital"></i>
            </div>
            <h3>Hospital Network</h3>
            <p>Access our wide network of partner hospitals across the country</p>
            <a href="/hospitals" className="feature-link">Find Hospitals <i className="fas fa-arrow-right"></i></a>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="feature-icon">
              <i className="fas fa-file-medical"></i>
            </div>
            <h3>Digital Records</h3>
            <p>Maintain your health records securely in one place</p>
            <a href="/records" className="feature-link">Manage Records <i className="fas fa-arrow-right"></i></a>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="feature-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h3>Easy Appointments</h3>
            <p>Book and manage doctor appointments with just a few clicks</p>
            <a href="/appointments" className="feature-link">Book Now <i className="fas fa-arrow-right"></i></a>
          </motion.div>
          
          <motion.div 
            className="feature-card"
            whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
          >
            <div className="feature-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <h3>Doctor Consultations</h3>
            <p>Connect with specialists via video, voice, or chat consultations</p>
            <a href="/consult" className="feature-link">Consult Now <i className="fas fa-arrow-right"></i></a>
          </motion.div>
        </div>
      </section>
      
      {/* Hospital Registration Promo */}
      <section className="hospital-promo-section">
        <div className="promo-container">
          <motion.div 
            className="promo-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>For Hospitals and Clinics</h2>
            <p>Join Bharath MediCare's network and expand your digital presence. Streamline appointments, manage patient records, and grow your practice.</p>
            <div className="promo-features">
              <div className="promo-feature-item">
                <i className="fas fa-users"></i>
                <span>Reach more patients</span>
              </div>
              <div className="promo-feature-item">
                <i className="fas fa-laptop-medical"></i>
                <span>Digitize operations</span>
              </div>
              <div className="promo-feature-item">
                <i className="fas fa-chart-line"></i>
                <span>Analytics dashboard</span>
              </div>
            </div>
            <button className="cta-button primary" onClick={() => navigate("/hospital-registration")}>
              Register Your Hospital
            </button>
          </motion.div>
          <motion.div 
            className="promo-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img src="/assets/hospital-dashboard1.png" alt="Hospital Dashboard" />
          </motion.div>
        </div>
      </section>
      
      {/* Download App Section */}
      <section className="app-download-section">
        <div className="app-download-container">
          <motion.div 
            className="app-image"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <img src="/assets/app-mockup.jpg" alt="Mobile App" />
          </motion.div>
          <motion.div 
            className="app-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Experience Bharath MediCare on Mobile</h2>
            <p>Download our app for a seamless healthcare experience on the go.</p>
            <div className="app-download-buttons">
              <a href="#" className="app-button">
                <i className="fab fa-google-play"></i>
                <div className="app-button-text">
                  <span>GET IT ON.</span>
                  <span className="store-name">Google Play</span>
                </div>
              </a>
              <a href="#" className="app-button">
                <i className="fab fa-apple"></i>
                <div className="app-button-text">
                  <span>Download on the</span>
                  <span className="store-name">App Store</span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;