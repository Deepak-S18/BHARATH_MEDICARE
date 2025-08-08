import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from './Header';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="home-wrapper">
      <Header />

      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-container">
          <motion.div 
            className="hero-text-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-badge">
              <i className="fas fa-shield-alt"></i>
              <span>Trusted Healthcare Platform</span>
            </div>
            <h1>Your Health, Our Priority</h1>
            <p className="hero-description">
              Experience next-generation healthcare with Bharath Medicare. Connect with top doctors, 
              book appointments instantly, and manage your health records all in one secure platform.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={() => navigate("/landing-login")}>
                <i className="fas fa-rocket"></i>
                Get Started Today
              </button>
              <button className="btn-outline" onClick={() => navigate("/about-us")}>
                <i className="fas fa-play"></i>
                Watch Demo
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-visual-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="floating-cards">
              <motion.div 
                className="health-card card-1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="card-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="card-content">
                  <h4>Heart Rate</h4>
                  <span className="health-value">72 BPM</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="health-card card-2"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="card-icon">
                  <i className="fas fa-thermometer-half"></i>
                </div>
                <div className="card-content">
                  <h4>Temperature</h4>
                  <span className="health-value">98.6°F</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="health-card card-3"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="card-icon">
                  <i className="fas fa-tint"></i>
                </div>
                <div className="card-content">
                  <h4>Blood Pressure</h4>
                  <span className="health-value">120/80</span>
                </div>
              </motion.div>
            </div>
            
            <div className="central-pulse">
              <motion.div 
                className="pulse-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="fas fa-user-md"></i>
              </motion.div>
              <div className="pulse-rings">
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="pulse-ring"
                    animate={{
                      scale: [1, 2.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: ring * 1
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div 
          className="trust-indicators"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="trust-item">
            <div className="trust-number">50K+</div>
            <div className="trust-label">Happy Patients</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">500+</div>
            <div className="trust-label">Expert Doctors</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">100+</div>
            <div className="trust-label">Partner Hospitals</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">24/7</div>
            <div className="trust-label">Emergency Care</div>
          </div>
        </motion.div>
      </section>

      {/* Quick Services Section */}
      <section className="quick-services">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Quick Access Services</h2>
            <p>Everything you need for your healthcare journey</p>
          </motion.div>

          <motion.div 
            className="services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <i className="fas fa-search-plus"></i>
              </div>
              <h3>Find Doctors</h3>
              <p>Search and connect with specialists near you</p>
              <button className="service-btn" onClick={() => navigate("/find-doctors")}>
                Explore Now
              </button>
            </motion.div>

            <motion.div className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Book Appointment</h3>
              <p>Schedule consultations at your convenience</p>
              <button className="service-btn" onClick={() => navigate("/appointment")}>
                Book Now
              </button>
            </motion.div>

            <motion.div className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <i className="fas fa-hospital"></i>
              </div>
              <h3>Emergency Care</h3>
              <p>24/7 emergency services and ambulance booking</p>
              <button className="service-btn" onClick={() => navigate("/emergency")}>
                Emergency
              </button>
            </motion.div>

            <motion.div className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <i className="fas fa-file-medical-alt"></i>
              </div>
              <h3>Health Records</h3>
              <p>Secure digital storage for all your medical data</p>
              <button className="service-btn" onClick={() => navigate("/records")}>
                Access Records
              </button>
            </motion.div>

            <motion.div className="service-card" variants={itemVariants}>
              <div className="service-icon">
                <i className="fas fa-video"></i>
              </div>
              <h3>Telemedicine</h3>
              <p>Virtual consultations from comfort of home</p>
              <button className="service-btn" onClick={() => navigate("/telemedicine")}>
                Start Consultation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="container">
          <div className="why-content">
            <motion.div 
              className="why-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Why Choose Bharath Medicare?</h2>
              <p className="why-description">
                We're revolutionizing healthcare delivery in India with cutting-edge technology 
                and compassionate care. Your health journey starts with us.
              </p>

              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-shield-check"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Secure & Private</h4>
                    <p>Bank-level encryption for your health data</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="feature-text">
                    <h4>24/7 Availability</h4>
                    <p>Round-the-clock healthcare support</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Certified Doctors</h4>
                    <p>Only verified and experienced professionals</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="feature-text">
                    <h4>Mobile-First</h4>
                    <p>Healthcare at your fingertips</p>
                  </div>
                </div>
              </div>

              <button className="btn-primary" onClick={() => navigate("/landing-login")}>
                Join Bharath Medicare
              </button>
            </motion.div>

            <motion.div 
              className="why-visual"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="visual-container">
                <div className="floating-elements">
                  <motion.div 
                    className="float-element element-1"
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <i className="fas fa-user-nurse"></i>
                  </motion.div>
                  <motion.div 
                    className="float-element element-2"
                    animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <i className="fas fa-stethoscope"></i>
                  </motion.div>
                  <motion.div 
                    className="float-element element-3"
                    animate={{ y: [0, -18, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <i className="fas fa-heart"></i>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Transform Your Healthcare Experience?</h2>
            <p>Join thousands of satisfied patients who trust Bharath Medicare for their healthcare needs</p>
            <div className="cta-actions">
              <button className="btn-primary" onClick={() => navigate("/landing-login")}>
                Get Started Now
              </button>
              <button className="btn-outline" onClick={() => navigate("/contact-us")}>
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
