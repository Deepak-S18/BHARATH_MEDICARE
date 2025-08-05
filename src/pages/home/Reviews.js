import React, { useState, useEffect } from "react";
import './styles/Home.css';
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

function Reviews() {
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

  const testimonials = [
    {
      name: "Arjun Patel",
      location: "Mumbai, Maharashtra",
      avatar: "/assets/Dr1.png",
      text: "Bharath MediCare transformed my healthcare experience. Finding a specialist, booking appointments, and managing my health records has never been easier.",
      rating: 5
    },
    {
      name: "Dr. Sarita Verma",
      location: "Delhi, NCR",
      avatar: "/assets/Dr2.png",
      text: "As a healthcare professional, I'm impressed by the platform's ability to connect patients with the right specialists efficiently and seamlessly.",
      rating: 5
    },
    {
      name: "Priya Krishnamurthy",
      location: "Bengaluru, Karnataka",
      avatar: "/assets/Dr3.png",
      text: "The telemedicine feature was a lifesaver during the pandemic. I could consult doctors from the safety of my home without compromising on healthcare quality.",
      rating: 4
    },
    {
      name: "Rajesh Gupta",
      location: "Kolkata, West Bengal",
      avatar: "/assets/Dr4.png",
      text: "Bharath MediCare's online pharmacy and lab test services have made healthcare management incredibly convenient for my entire family.",
      rating: 5
    }
  ];
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
      {/* Reviews Hero Section */}
      <section className="hero-section" style={{ marginBottom: "30px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-content"
          style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", paddingRight: "0" }}
        >
          <h1>Patient Testimonials</h1>
          <div className="tagline-wrapper">
            <p className="tagline">Real Stories, Real Impact</p>
            <p className="sub-tagline">Hear from those whose lives we've touched</p>
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: "60px 20px", background: "linear-gradient(135deg, #f9f9f9, #f0f0f0)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "50px" }}
          >
            <h2 style={{ fontSize: "2.2rem", marginBottom: "20px", color: "#2d2f31", position: "relative" }}>What Our Users Say</h2>
            <div style={{ width: "80px", height: "3px", background: "#00d084", margin: "0 auto 30px" }}></div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{ 
                  background: "white", 
                  padding: "30px", 
                  borderRadius: "15px", 
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <div style={{ 
                    width: "60px", 
                    height: "60px", 
                    borderRadius: "50%", 
                    overflow: "hidden", 
                    marginRight: "15px" 
                  }}>
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#2d2f31" }}>{testimonial.name}</h3>
                    <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>{testimonial.location}</p>
                  </div>
                </div>
                <p style={{ 
                  fontSize: "1rem", 
                  color: "#555", 
                  lineHeight: "1.6", 
                  marginBottom: "15px",
                  flexGrow: 1
                }}>
                  "{testimonial.text}"
                </p>
                <div style={{ display: "flex", color: "#00d084" }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{ marginRight: "5px" }}></i>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section (Identical to About Us) */}
      <Footer />
    </div>
  );
}

export default Reviews;