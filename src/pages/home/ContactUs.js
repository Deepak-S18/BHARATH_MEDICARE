import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function ContactUs() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

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

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save form data to localStorage (you can change 'formData' to a different key if needed)
    localStorage.setItem('formData', JSON.stringify(formData));
    
    // Clear form data after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    // Display alert or any other feedback
    alert('Thank you for your message! We will get back to you soon.');
  };
  const location = useLocation();
  const isLinkActive = (path) => {
    return location.pathname === path || 
           (path === '/' && (location.pathname === '/' || location.pathname === ''));
  };
  return (
    <div className="base-page-container">
      {/* Header Section (Same as About Us) */}
      <Header 
      scrolled={scrolled}
      isLinkActive={isLinkActive}
      mobileMenuOpen={mobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
    />
      {/* Contact Hero Section */}
      <section className="hero-section" style={{ marginBottom: "30px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingRight: "0" }}
        >
          <h1>Contact Bharath MediCare</h1>
          <div className="tagline-wrapper">
            <p className="tagline">We're Here to Help</p>
            <p className="sub-tagline">Connect with our support team anytime</p>
          </div>
        </motion.div>
      </section>

      {/* Contact Information Section */}
      <section style={{ padding: "40px 20px", background: "white" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "30px" }}>
          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ flex: "1", minWidth: "300px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31" }}>Contact Details</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", marginBottom: "30px" }}></div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#2d2f31" }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: "10px", color: "#00d084" }}></i>
                Address
              </h3>
              <p style={{ color: "#555" }}>123 Healthcare Avenue, Bengaluru, Karnataka 560001, India</p>
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#2d2f31" }}>
                <i className="fas fa-phone" style={{ marginRight: "10px", color: "#00d084" }}></i>
                Phone
              </h3>
              <p style={{ color: "#555" }}>+91 1800-123-4567</p>
            </div>
            
            <div>
              <h3 style={{ fontSize: "1.4rem", marginBottom: "10px", color: "#2d2f31" }}>
                <i className="fas fa-envelope" style={{ marginRight: "10px", color: "#00d084" }}></i>
                Email
              </h3>
              <p style={{ color: "#555" }}>info@bharathmedicare.com</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ flex: "1", minWidth: "300px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31" }}>Send Us a Message</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", marginBottom: "30px" }}></div>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%", 
                  padding: "12px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px", 
                  fontSize: "1rem"
                }}
              />
              
              <input 
                type="email" 
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%", 
                  padding: "12px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px", 
                  fontSize: "1rem"
                }}
              />
              
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                style={{
                  width: "100%", 
                  padding: "12px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px", 
                  fontSize: "1rem"
                }}
              />
              
              <select 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                style={{
                  width: "100%", 
                  padding: "12px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px", 
                  fontSize: "1rem",
                  backgroundColor: "white"
                }}
              >
                <option value="">Select Subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
              </select>
              
              <textarea 
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                style={{
                  width: "100%", 
                  padding: "12px", 
                  border: "1px solid #ddd", 
                  borderRadius: "5px", 
                  fontSize: "1rem",
                  resize: "vertical"
                }}
              ></textarea>
              
              <button 
                type="submit" 
                style={{
                  backgroundColor: "#00d084", 
                  color: "white", 
                  border: "none", 
                  padding: "12px 24px", 
                  borderRadius: "5px", 
                  fontSize: "1rem", 
                  cursor: "pointer",
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#00a06b"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#00d084"}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer Section (Same as About Us) */}
      <Footer />
    </div>
  );
}

export default ContactUs;