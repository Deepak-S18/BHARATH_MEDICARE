import React, { useState, useEffect } from "react";
import { useNavigate,useLocation  } from "react-router-dom";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from './Header';
import Footer from './Footer';

function AboutUs() {
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
      {/* About Us Hero Section */}
      <section className="hero-section" style={{ marginBottom: "30px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingRight: "0" }}
        >
          <h1>About Bharath MediCare</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Pioneering Healthcare Transformation in India</p>
            <p className="sub-tagline">Building a healthier nation through technology</p>
          </div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section style={{ padding: "40px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Our Story</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", marginBottom: "30px" }}></div>
            <p style={{ maxWidth: "800px", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              Founded in 2021, Bharath MediCare began with a simple mission: to make quality healthcare accessible to every Indian citizen through technology. What started as a small team of healthcare professionals and technology enthusiasts has grown into India's largest integrated healthcare platform, connecting millions of patients with healthcare providers nationwide.
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
              <img src="/assets/LOGO.png" alt="Bharath MediCare Team" style={{ width: "100%", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ flex: "1", minWidth: "300px", maxWidth: "600px" }}
            >
              <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#2d2f31" }}>Our Vision</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>
                To create a healthier India where quality healthcare is accessible to everyone, regardless of geographic location or economic status.
              </p>
              
              <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", color: "#2d2f31" }}>Our Mission</h3>
              <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#555", marginBottom: "30px" }}>
                To leverage technology to bridge the healthcare gap in India by connecting patients, doctors, and healthcare facilities through a single, integrated digital platform.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section style={{ padding: "60px 20px", background: "linear-gradient(135deg, #f9f9f9, #f0f0f0)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Our Core Values</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              These principles guide every decision we make and every service we provide.
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
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Patient First</h3>
              <p>We put patients at the center of everything we do, ensuring that their needs, safety, and well-being are our top priorities.</p>
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
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Integrity & Trust</h3>
              <p>We uphold the highest standards of honesty, transparency, and ethical conduct in all our interactions and operations.</p>
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
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>We continuously seek new and better ways to solve healthcare challenges, embracing cutting-edge technology and creative thinking.</p>
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
                <i className="fas fa-users"></i>
              </div>
              <h3>Inclusivity</h3>
              <p>We strive to make healthcare accessible to all Indians, regardless of location, language, economic status, or technological literacy.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section style={{ padding: "60px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Our Leadership Team</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
            <p style={{ maxWidth: "800px", margin: "0 auto", fontSize: "1.1rem", lineHeight: "1.8", color: "#555" }}>
              Meet the visionaries driving our mission to transform healthcare in India
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
            {/* Team Member 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ textAlign: "center" }}
              whileHover={{ y: -5 }}
            >
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "200px", height: "200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                <img src="/team-1.png" alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.4rem", margin: "20px 0 5px", color: "#2d2f31" }}>Deepak S</h3>
              <p style={{ color: "#00d084", fontWeight: "600", marginBottom: "10px" }}>1EP22IC016</p>
              <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6" }}>
  <p>East Point College of Engineering and Technology</p>
  <p>Bachelor of Engineering in CSE (IoT & CSBT)</p>
</div>

            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ textAlign: "center" }}
              whileHover={{ y: -5 }}
            >
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "200px", height: "200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                <img src="/team-1.png" alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.4rem", margin: "20px 0 5px", color: "#2d2f31" }}>Vishal Bharadwaj</h3>
              <p style={{ color: "#00d084", fontWeight: "600", marginBottom: "10px" }}>1EP22IC060</p>
              <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6" }}>
  <p>East Point College of Engineering and Technology</p>
  <p>Bachelor of Engineering in CSE (IoT & CSBT)</p>
</div>

            </motion.div>
            
            {/* Team Member 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ textAlign: "center" }}
              whileHover={{ y: -5 }}
            >
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "200px", height: "200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                <img src="/team-1.png" alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.4rem", margin: "20px 0 5px", color: "#2d2f31" }}>Deeksha N</h3>
              <p style={{ color: "#00d084", fontWeight: "600", marginBottom: "10px" }}>1EP22IC015</p>
              <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6" }}>
  <p>East Point College of Engineering and Technology</p>
  <p>Bachelor of Engineering in CSE (IoT & CSBT)</p>
</div>

            </motion.div>
            
            {/* Team Member 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              style={{ textAlign: "center" }}
              whileHover={{ y: -5 }}
            >
              <div style={{ borderRadius: "50%", overflow: "hidden", width: "200px", height: "200px", margin: "0 auto", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
                <img src="/team-1.png" alt="CEO" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "1.4rem", margin: "20px 0 5px", color: "#2d2f31" }}>Harshitha M</h3>
              <p style={{ color: "#00d084", fontWeight: "600", marginBottom: "10px" }}>1EP22IC022</p>
              <div style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.6" }}>
  <p>East Point College of Engineering and Technology</p>
  <p>Bachelor of Engineering in CSE (IoT & CSBT)</p>
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section style={{ padding: "60px 20px", background: "linear-gradient(135deg, #f0f7f4, #dff5eb, #c3edd8)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>Our Impact</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)", textAlign: "center" }}
            >
              <div style={{ fontSize: "3.5rem", fontWeight: "700", color: "#00d084", marginBottom: "10px" }}>10M+</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>Patient Lives Improved</h3>
              <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>
                We've helped millions of patients access quality healthcare services
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)", textAlign: "center" }}
            >
              <div style={{ fontSize: "3.5rem", fontWeight: "700", color: "#00d084", marginBottom: "10px" }}>5000+</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>Healthcare Institutions</h3>
              <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>
                Partnered with hospitals and clinics across 28 states and 8 union territories
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              style={{ background: "white", padding: "30px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)", textAlign: "center" }}
            >
              <div style={{ fontSize: "3.5rem", fontWeight: "700", color: "#00d084", marginBottom: "10px" }}>50k+</div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>Healthcare Professionals</h3>
              <p style={{ color: "#666", fontSize: "1rem", lineHeight: "1.6" }}>
                Doctors, specialists, and healthcare providers on our platform
              </p>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Footer Section */}
       <Footer />
    </div>
  );
}

export default AboutUs;