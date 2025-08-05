import React, { useState, useEffect } from "react";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Services() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("patients");

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
      {/* Header Section */}
    <Header 
      scrolled={scrolled}
      isLinkActive={isLinkActive}
      mobileMenuOpen={mobileMenuOpen}
      toggleMobileMenu={toggleMobileMenu}
    />

      {/* Services Hero Section */}
      <section className="hero-section" style={{ marginBottom: "30px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingRight: "0" }}
        >
          <h1>Our Services</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Comprehensive healthcare solutions for everyone</p>
            <p className="sub-tagline">Empowering patients, doctors, and hospitals with innovative technology</p>
          </div>
        </motion.div>
      </section>

      {/* Service Category Navigation */}
      <section style={{ padding: "20px 20px 40px", background: "white" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "15px", marginBottom: "40px" }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("patients")}
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                background: activeTab === "patients" ? "#00d084" : "#f0f0f0",
                color: activeTab === "patients" ? "white" : "#555",
                boxShadow: activeTab === "patients" ? "0 4px 15px rgba(0, 208, 132, 0.3)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              <i className="fas fa-user-circle" style={{ marginRight: "8px" }}></i> For Patients
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("doctors")}
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                background: activeTab === "doctors" ? "#00d084" : "#f0f0f0",
                color: activeTab === "doctors" ? "white" : "#555",
                boxShadow: activeTab === "doctors" ? "0 4px 15px rgba(0, 208, 132, 0.3)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              <i className="fas fa-stethoscope" style={{ marginRight: "8px" }}></i> For Doctors
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("hospitals")}
              style={{
                padding: "12px 25px",
                borderRadius: "30px",
                border: "none",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: "pointer",
                background: activeTab === "hospitals" ? "#00d084" : "#f0f0f0",
                color: activeTab === "hospitals" ? "white" : "#555",
                boxShadow: activeTab === "hospitals" ? "0 4px 15px rgba(0, 208, 132, 0.3)" : "none",
                transition: "all 0.3s ease"
              }}
            >
              <i className="fas fa-hospital" style={{ marginRight: "8px" }}></i> For Hospitals
            </motion.button>
          </div>

          {/* Services Content - For Patients */}
          {activeTab === "patients" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "50px" }}>
                {/* Service Card 1 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/online-appointment.png" 
                      alt="Online Appointments" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Online Appointments
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Book appointments with top doctors and specialists across India. Choose based on specialization, ratings, and availability.
                    </p>
                    <a 
                      href="/appointment-booking"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Book Now <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Service Card 2 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/telemedicine-consultation.png" 
                      alt="Telemedicine Consultations" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Telemedicine Consultations
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Connect with doctors via video, audio, or chat from the comfort of your home. Get prescriptions and follow-ups digitally.
                    </p>
                    <a 
                      href="/telemedicine"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Consult Now <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Service Card 3 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/digital-health-record.png" 
                      alt="Digital Health Records" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Digital Health Records
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Store and access your medical records, prescriptions, lab reports, and imaging results in one secure digital vault.
                    </p>
                    <a 
                      href="/health-records"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Learn More <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Service Card 4 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/online-pharmacy.png" 
                      alt="Online Pharmacy" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Online Pharmacy
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Order prescribed medications and healthcare products with doorstep delivery. Track orders in real-time.
                    </p>
                    <a 
                      href="/pharmacy"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Order Now <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Service Card 5 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/home-lab-test.png" 
                      alt="Home Lab Tests" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Home Lab Tests
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Book diagnostic tests at home. Trained phlebotomists collect samples, and digital reports are delivered to your account.
                    </p>
                    <a 
                      href="/lab-tests"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Book Tests <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Service Card 6 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/wellness-program.png" 
                      alt="Wellness Programs" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Wellness Programs
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Access personalized wellness plans, diet counseling, fitness tracking, and mental health support services.
                    </p>
                    <a 
                      href="/wellness"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Explore Programs <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Services Content - For Doctors */}
          {activeTab === "doctors" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "50px" }}>
                {/* Doctor Service Card 1 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/Digital-Practice-Management.png" 
                      alt="Digital Practice Management" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Digital Practice Management
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Manage your practice with our integrated platform. Schedule appointments, maintain digital patient records, and track billing.
                    </p>
                    <a 
                      href="/doctor-signup"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Join Now <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Doctor Service Card 2 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/Telemedicine-Platform.png" 
                      alt="Telemedicine Platform" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Telemedicine Platform
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Conduct virtual consultations with high-quality video conferencing, digital prescription tools, and follow-up management.
                    </p>
                    <a 
                      href="/doctor-telemedicine"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Learn More <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Doctor Service Card 3 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/AI-Diagnostic-Support.png" 
                      alt="AI Diagnostic Support" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      AI Diagnostic Support
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Access AI-powered tools to assist with diagnostics, treatment planning, and staying updated with the latest medical research.
                    </p>
                    <a 
                      href="/doctor-ai-tools"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Explore Tools <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Services Content - For Hospitals */}
          {activeTab === "hospitals" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "50px" }}>
                {/* Hospital Service Card 1 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/Hospital-Managemen-System.png" 
                      alt="Hospital Management System" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Hospital Management System
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Comprehensive hospital management software for patient registration, billing, inventory, staff management, and more.
                    </p>
                    <a 
                      href="/hospital-management"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Request Demo <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                
                {/* Hospital Service Card 2 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/Electronic-Health-Records.png" 
                      alt="Electronic Health Records" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Electronic Health Records
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Secure, compliant, and interoperable electronic health record system designed for hospitals of all sizes.
                    </p>
                    <a 
                      href="/hospital-ehr"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Learn More <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
                {/* Hospital Service Card A3 */}
<motion.div 
  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
  style={{ 
    background: "white", 
    borderRadius: "15px", 
    overflow: "hidden",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease"
  }}
>
  <div style={{ height: "200px", overflow: "hidden" }}>
    <img 
      src="/assets/Analytics-&-Reporting.png" 
      alt="Analytics & Reporting" 
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </div>
  <div style={{ padding: "25px" }}>
    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
      Analytics & Reporting
    </h3>
    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
      Advanced analytics platform with customizable dashboards, KPI tracking, and data-driven insights for better hospital management.
    </p>
    <a 
      href="/hospital-analytics"
      style={{ 
        display: "inline-flex", 
        alignItems: "center", 
        color: "#00d084", 
        fontWeight: "600",
        textDecoration: "none" 
      }}
    >
      View Features <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
    </a>
  </div>
</motion.div>
                {/* Hospital Service Card 4 */}
                <motion.div 
                  whileHover={{ y: -10, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  style={{ 
                    background: "white", 
                    borderRadius: "15px", 
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      src="/assets/Insurance-&-Claims-Management.png" 
                      alt="Insurance & Claims Management" 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ padding: "25px" }}>
                    <h3 style={{ fontSize: "1.4rem", marginBottom: "15px", color: "#2d2f31" }}>
                      Insurance & Claims Management
                    </h3>
                    <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
                      Streamline insurance verification, claims processing, and reimbursement tracking with our integrated platform.
                    </p>
                    <a 
                      href="/hospital-claims"
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        color: "#00d084", 
                        fontWeight: "600",
                        textDecoration: "none" 
                      }}
                    >
                      Explore Solutions <i className="fas fa-arrow-right" style={{ marginLeft: "8px" }}></i>
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Service Benefits Section */}
      <section style={{ padding: "60px 20px", background: "#f9f9f9" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "15px", color: "#2d2f31" }}>Why Choose Bharath MediCare?</h2>
          <p style={{ color: "#666", maxWidth: "700px", margin: "0 auto 50px", lineHeight: "1.6" }}>
            We're transforming healthcare across India with technology that benefits everyone in the healthcare ecosystem.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
            {/* Benefit 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ background: "white", padding: "30px 20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            >
              <div style={{ fontSize: "40px", color: "#00d084", marginBottom: "15px" }}>
                <i className="fas fa-globe-asia"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#2d2f31" }}>Pan-India Network</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Connect with over 25,000 doctors and 5,000+ hospitals across 100+ cities in India.
              </p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ background: "white", padding: "30px 20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            >
              <div style={{ fontSize: "40px", color: "#00d084", marginBottom: "15px" }}>
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#2d2f31" }}>Data Security</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                HIPAA-compliant systems with end-to-end encryption to protect your sensitive medical information.
              </p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ background: "white", padding: "30px 20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            >
              <div style={{ fontSize: "40px", color: "#00d084", marginBottom: "15px" }}>
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#2d2f31" }}>Advanced Technology</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                AI-powered systems, cloud infrastructure, and mobile-first design for seamless healthcare experiences.
              </p>
            </motion.div>
            
            {/* Benefit 4 */}
            <motion.div 
              whileHover={{ y: -5 }}
              style={{ background: "white", padding: "30px 20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}
            >
              <div style={{ fontSize: "40px", color: "#00d084", marginBottom: "15px" }}>
                <i className="fas fa-headset"></i>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "#2d2f31" }}>24/7 Support</h3>
              <p style={{ color: "#666", lineHeight: "1.6" }}>
                Round-the-clock customer service and technical support for patients, doctors, and hospitals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ padding: "80px 20px", background: "linear-gradient(135deg, #00d084 0%, #00a06b 100%)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "white" }}>Ready to transform healthcare?</h2>
          <p style={{ color: "white", fontSize: "1.1rem", marginBottom: "30px", maxWidth: "700px", margin: "0 auto 30px" }}>
            Join Bharath MediCare today and experience the future of healthcare in India.
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/signup"
              style={{ 
                background: "white", 
                color: "#00d084", 
                padding: "14px 32px", 
                borderRadius: "30px", 
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "1.1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}
            >
              Sign Up Now
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              style={{ 
                background: "transparent", 
                color: "white", 
                padding: "14px 32px", 
                borderRadius: "30px", 
                border: "2px solid white",
                fontWeight: "600",
                textDecoration: "none",
                fontSize: "1.1rem"
              }}
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Services;