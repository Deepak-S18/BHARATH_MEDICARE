import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from './Header';
import Footer from './Footer';

function HealthRecords() {
  const navigate = useNavigate();
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
  const location = useLocation();
  const isLinkActive = (path) => {
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
      {/* Health Records Hero Section */}
      <section className="hero-section" style={{ marginBottom: "30px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingRight: "0" }}
        >
          <h1>Health Records System</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Secure, Accessible, Patient-Centric Health Information</p>
            <p className="sub-tagline">Empowering patients and healthcare providers with seamless digital health records</p>
          </div>
        </motion.div>
      </section>

      {/* Overview Section */}
      <section style={{ padding: "40px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Our Health Records System</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", marginBottom: "30px" }}></div>
            <p style={{ maxWidth: "800px", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              At Bharath MediCare, we've revolutionized health record management with our state-of-the-art digital platform. Our secure, comprehensive system ensures that your medical history is always accessible to you and your authorized healthcare providers, while maintaining the highest standards of privacy and security.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center", marginTop: "30px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ flex: "1", minWidth: "300px", maxWidth: "600px" }}
            >
              <img src="/health-records-image.png" alt="Digital Health Records" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ flex: "1", minWidth: "300px", maxWidth: "600px" }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#2d2f31" }}>Transforming Healthcare Documentation</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>
                Our digital health records system eliminates the challenges of paper-based medical records, reducing errors, preventing record loss, and enabling instant access to critical health information when needed most.
              </p>
              
              <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#2d2f31" }}>Patient-Centered Approach</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>
                We believe patients should have ownership of their health data. Our platform puts you in control, allowing you to grant and manage access to your records while maintaining complete transparency about who views your information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section style={{ padding: "60px 20px", background: "linear-gradient(135deg, #f9f9f9, #f0f0f0)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Key Features</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              Our comprehensive health records system offers powerful capabilities designed for patients and healthcare providers.
            </p>
          </motion.div>

          <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-lock"></i>
              </div>
              <h3>Advanced Security</h3>
              <p>End-to-end encryption, multi-factor authentication, and rigorous access controls protect your sensitive medical information.</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>24/7 Accessibility</h3>
              <p>Access your complete medical history anytime, anywhere through our web portal and mobile application.</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>Seamless Sharing</h3>
              <p>Easily share your records with healthcare providers across our network, ensuring coordinated care and reducing duplicate tests.</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
            >
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Health Analytics</h3>
              <p>Gain insights into your health trends with visualizations and personalized recommendations based on your medical history.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: "60px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>How It Works</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              Our streamlined process makes managing your health records simple and intuitive
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px" }}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div style={{ background: "#00d084", color: "white", width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "20px" }}>1</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31", textAlign: "center" }}>Create Your Account</h3>
              <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.7", textAlign: "center" }}>
                Sign up with basic information and verify your identity through our secure authentication process.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div style={{ background: "#00d084", color: "white", width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "20px" }}>2</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31", textAlign: "center" }}>Import Your Records</h3>
              <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.7", textAlign: "center" }}>
                Upload existing medical records or connect with healthcare providers in our network for automatic synchronization.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div style={{ background: "#00d084", color: "white", width: "60px", height: "60px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", fontWeight: "bold", marginBottom: "20px" }}>3</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31", textAlign: "center" }}>Manage & Share</h3>
              <p style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.7", textAlign: "center" }}>
                Control access to your records, share with healthcare providers, and receive automatic updates after each appointment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: "60px 20px", background: "linear-gradient(135deg, #f0f7f4, #dff5eb, #c3edd8)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Benefits</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              Our health records system delivers significant advantages for patients and healthcare providers alike
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)" }}
            >
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31", borderLeft: "4px solid #00d084", paddingLeft: "15px" }}>For Patients</h3>
              <ul style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li>Complete access to your medical history in one secure location</li>
                <li>Reduced paperwork and administrative burden</li>
                <li>Avoid unnecessary duplicate tests and procedures</li>
                <li>Better coordination between different healthcare providers</li>
                <li>Personalized health insights and preventive care recommendations</li>
              </ul>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)" }}
            >
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31", borderLeft: "4px solid #00d084", paddingLeft: "15px" }}>For Healthcare Providers</h3>
              <ul style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.8", paddingLeft: "20px" }}>
                <li>Instant access to comprehensive patient medical histories</li>
                <li>Improved diagnosis accuracy with complete health information</li>
                <li>Enhanced care coordination across different specialists</li>
                <li>Reduced administrative overhead and improved efficiency</li>
                <li>Data-driven insights for better treatment planning</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Security Section */}
      <section style={{ padding: "60px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "40px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Security & Compliance</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ background: "#f9f9f9", padding: "40px", borderRadius: "15px", boxShadow: "0 8px 25px rgba(0, 0, 0, 0.05)", maxWidth: "900px", margin: "0 auto" }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", alignItems: "center" }}>
              <div style={{ flex: "1", minWidth: "300px" }}>
                <h3 style={{ fontSize: "1.6rem", marginBottom: "20px", color: "#2d2f31" }}>Your Data, Protected</h3>
                <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555", marginBottom: "20px" }}>
                  We implement industry-leading security measures to ensure your health information remains private and protected at all times.
                </p>
                <ul style={{ color: "#555", fontSize: "1.1rem", lineHeight: "1.8", paddingLeft: "20px" }}>
                  <li>End-to-end encryption for all data transmission and storage</li>
                  <li>Compliance with international healthcare data protection standards</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Detailed access logs and activity monitoring</li>
                  <li>Disaster recovery and business continuity protocols</li>
                </ul>
              </div>
              <div style={{ flex: "1", minWidth: "300px", display: "flex", justifyContent: "center" }}>
                <img src="/security-shield.png" alt="Data Security" style={{ maxWidth: "100%", height: "auto" }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 20px", background: "linear-gradient(135deg, #00d084, #00a86b)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: "2.4rem", marginBottom: "20px", color: "white" }}>Take Control of Your Health Records Today</h2>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "white", marginBottom: "30px", maxWidth: "700px", margin: "0 auto 30px" }}>
              Join millions of Indians who have already transformed their healthcare experience with Bharath MediCare's digital health records system.
            </p>
            <button 
              style={{ 
                background: "white", 
                color: "#00a86b", 
                padding: "15px 35px", 
                fontSize: "1.1rem", 
                fontWeight: "600", 
                border: "none", 
                borderRadius: "50px", 
                cursor: "pointer",
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              onClick={() => navigate('/patient-login')}
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default HealthRecords;