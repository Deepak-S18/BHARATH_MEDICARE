
import React from "react";
import "./styles/Footer.css"; 

const Footer = () => {
  return (
    <footer style={{ background: "#2d2f31", color: "white", padding: "60px 20px 30px" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "40px" }}>
        {/* Company Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <img src="/assets/LOGO.png" alt="Bharath MediCare" style={{ height: "40px", marginRight: "15px" }} />
            <div>
              <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                <span style={{ color: "#FF9933" }}>Bharath</span>
                <span style={{ color: "#00a06b" }}>MediCare</span>
              </div>
            </div>
          </div>
          <p style={{ color: "#ccc", lineHeight: "1.6", marginBottom: "20px" }}>
            Transforming healthcare across India with innovative technology solutions.
          </p>
          <div style={{ display: "flex", gap: "15px" }}>
            <a href="/" style={{ color: "white", fontSize: "20px" }}><i className="fab fa-facebook"></i></a>
            <a href="/" style={{ color: "white", fontSize: "20px" }}><i className="fab fa-twitter"></i></a>
            <a href="/" style={{ color: "white", fontSize: "20px" }}><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/bharathmedicare/" style={{ color: "white", fontSize: "20px" }}><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}><a href="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/about-us" style={{ color: "#ccc", textDecoration: "none" }}>About Us</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/services" style={{ color: "#ccc", textDecoration: "none" }}>Services</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/reviews" style={{ color: "#ccc", textDecoration: "none" }}>Reviews</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/contact-us" style={{ color: "#ccc", textDecoration: "none" }}>Contact Us</a></li>
          </ul>
        </div>
        
        {/* Services */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>Services</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}><a href="/appointment" style={{ color: "#ccc", textDecoration: "none" }}>Appointments</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/telemedicine" style={{ color: "#ccc", textDecoration: "none" }}>Telemedicine</a></li>
            <li style={{ marginBottom: "10px" }}><a href="/health-records" style={{ color: "#ccc", textDecoration: "none" }}>Health Records</a></li>
            <li><a href="/lab-tests" style={{ color: "#ccc", textDecoration: "none" }}>Lab Tests</a></li>
          </ul>
        </div>
        
        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "1.1rem", marginBottom: "20px", color: "white" }}>Contact Us</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "15px", display: "flex", alignItems: "flex-start" }}>
          <i className="fas fa-map-marker-alt" style={{ marginRight: "10px", marginTop: "5px" }}></i>
            <span>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=123+Healthcare+Avenue,+Bengaluru,+Karnataka+560001,+India" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: "white", textDecoration: "none" }}
              >
              123 Healthcare Avenue, Bengaluru, Karnataka 560001, India
              </a>
            </span>
            </li>
            <li style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <i className="fas fa-phone" style={{ marginRight: "10px" }}></i>
              <span>
                <a href="tel:+918073731513" style={{ color: "white", textDecoration: "none" }}>
                  +91 8073731513
                </a>
              </span>
            </li>
            <li style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
              <i className="fas fa-envelope" style={{ marginRight: "10px" }}></i>
              <span>info@bharathedicare.com</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div style={{ borderTop: "1px solid #444", paddingTop: "20px", textAlign: "center" }}>
        <p style={{ color: "#ccc" }}>
          &copy; {new Date().getFullYear()} Bharath MediCare. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
