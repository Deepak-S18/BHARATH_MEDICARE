import React, { useState } from "react";
import { motion } from "framer-motion";
import './styles/HospitalRegistration.css';

function HospitalRegistration() {
  // State for form data
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    establishedYear: "",
    hospitalType: "",
    specialties: [],
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      website: "",
    },
    adminDetails: {
      name: "",
      designation: "",
      email: "",
      phone: "",
    },
    facilities: [],
    emergencyServices: false,
    insuranceAccepted: [],
    governmentAccredited: false,
    description: "",
    logo: null,
    acceptTerms: false,
  });

  // List of common specialties for checkbox selection
  const specialtyOptions = [
    "Cardiology", "Orthopedics", "Neurology", "Pediatrics", 
    "Gynecology", "Oncology", "Dermatology", "ENT",
    "Ophthalmology", "Psychiatry", "Urology", "Nephrology",
    "Gastroenterology", "Pulmonology", "Endocrinology"
  ];

  // List of common facilities for checkbox selection
  const facilityOptions = [
    "ICU", "NICU", "Operating Theaters", "Laboratory",
    "Radiology", "Pharmacy", "Blood Bank", "Ambulance Services",
    "Cafeteria", "Parking", "Wi-Fi", "Patient Rooms"
  ];

  // List of insurance providers
  const insuranceOptions = [
    "National Health Insurance", "Star Health", "Aditya Birla Health Insurance",
    "HDFC ERGO", "ICICI Lombard", "Bajaj Allianz", "Ayushman Bharat",
    "Government Schemes", "Other Private Insurers"
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested objects in state
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } 
    // Handle checkboxes
    else if (type === "checkbox") {
      if (name === "acceptTerms" || name === "emergencyServices" || name === "governmentAccredited") {
        setFormData({
          ...formData,
          [name]: checked,
        });
      } else {
        // Handle array checkboxes (specialties, facilities, insurance)
        const array = formData[name];
        if (checked) {
          setFormData({
            ...formData,
            [name]: [...array, value],
          });
        } else {
          setFormData({
            ...formData,
            [name]: array.filter(item => item !== value),
          });
        }
      }
    } 
    // Handle file input
    else if (type === "file") {
      setFormData({
        ...formData,
        [name]: e.target.files[0],
      });
    } 
    // Handle regular inputs
    else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Here you would typically send the data to your backend API
    alert("Registration information submitted successfully! We will review your details and contact you soon.");
  };

  return (
    <div className="hospital-registration-container">
      <motion.div 
        className="registration-form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <h1>Hospital Registration</h1>
          <p>Join our network of healthcare providers and expand your reach</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          {/* Basic Information Section */}
          <div className="form-section">
            <h2>Hospital Information</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hospitalName">Hospital Name*</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  placeholder="Enter hospital name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="registrationNumber">Registration Number*</label>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="establishedYear">Established Year</label>
                <input
                  type="number"
                  id="establishedYear"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                  placeholder="Year of establishment"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="hospitalType">Hospital Type*</label>
                <select
                  id="hospitalType"
                  name="hospitalType"
                  value={formData.hospitalType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select hospital type</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                  <option value="Trust">Trust</option>
                  <option value="Charitable">Charitable</option>
                  <option value="Teaching">Teaching/University</option>
                  <option value="Community">Community</option>
                  <option value="ClinicCenter">Clinic/Medical Center</option>
                  <option value="Specialty">Specialty Hospital</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="form-section">
            <h2>Address</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="address.street">Street Address*</label>
                <input
                  type="text"
                  id="address.street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="address.city">City*</label>
                <input
                  type="text"
                  id="address.city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address.state">State*</label>
                <input
                  type="text"
                  id="address.state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address.pincode">Pincode*</label>
                <input
                  type="text"
                  id="address.pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit pincode"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactInfo.email">Email*</label>
                <input
                  type="email"
                  id="contactInfo.email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="Enter hospital email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="contactInfo.phone">Phone Number*</label>
                <input
                  type="tel"
                  id="contactInfo.phone"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Enter hospital phone number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="contactInfo.website">Website</label>
                <input
                  type="url"
                  id="contactInfo.website"
                  name="contactInfo.website"
                  value={formData.contactInfo.website}
                  onChange={handleInputChange}
                  placeholder="Enter hospital website (if any)"
                />
              </div>
            </div>
          </div>

          {/* Admin Details */}
          <div className="form-section">
            <h2>Administrator Details</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adminDetails.name">Admin Name*</label>
                <input
                  type="text"
                  id="adminDetails.name"
                  name="adminDetails.name"
                  value={formData.adminDetails.name}
                  onChange={handleInputChange}
                  placeholder="Enter administrator name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="adminDetails.designation">Designation*</label>
                <input
                  type="text"
                  id="adminDetails.designation"
                  name="adminDetails.designation"
                  value={formData.adminDetails.designation}
                  onChange={handleInputChange}
                  placeholder="Enter designation"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adminDetails.email">Admin Email*</label>
                <input
                  type="email"
                  id="adminDetails.email"
                  name="adminDetails.email"
                  value={formData.adminDetails.email}
                  onChange={handleInputChange}
                  placeholder="Enter admin email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="adminDetails.phone">Admin Phone*</label>
                <input
                  type="tel"
                  id="adminDetails.phone"
                  name="adminDetails.phone"
                  value={formData.adminDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Enter admin phone number"
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Specialties Section */}
          <div className="form-section">
            <h2>Hospital Specialties</h2>
            <div className="form-divider"></div>
            <p className="section-description">Select all the specialties available at your hospital</p>
            
            <div className="checkbox-grid">
              {specialtyOptions.map((specialty) => (
                <div key={specialty} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`specialty-${specialty}`}
                    name="specialties"
                    value={specialty}
                    checked={formData.specialties.includes(specialty)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`specialty-${specialty}`}>{specialty}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Section */}
          <div className="form-section">
            <h2>Hospital Facilities</h2>
            <div className="form-divider"></div>
            <p className="section-description">Select all facilities available at your hospital</p>
            
            <div className="checkbox-grid">
              {facilityOptions.map((facility) => (
                <div key={facility} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`facility-${facility}`}
                    name="facilities"
                    value={facility}
                    checked={formData.facilities.includes(facility)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`facility-${facility}`}>{facility}</label>
                </div>
              ))}
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="emergencyServices"
                    name="emergencyServices"
                    checked={formData.emergencyServices}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="emergencyServices">
                    24/7 Emergency Services Available
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance and Accreditation */}
          <div className="form-section">
            <h2>Insurance & Accreditation</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <p className="section-description">Select insurance providers accepted at your hospital</p>
                <div className="checkbox-grid">
                  {insuranceOptions.map((insurance) => (
                    <div key={insurance} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={`insurance-${insurance}`}
                        name="insuranceAccepted"
                        value={insurance}
                        checked={formData.insuranceAccepted.includes(insurance)}
                        onChange={handleInputChange}
                      />
                      <label htmlFor={`insurance-${insurance}`}>{insurance}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <div className="toggle-switch">
                  <input
                    type="checkbox"
                    id="governmentAccredited"
                    name="governmentAccredited"
                    checked={formData.governmentAccredited}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="governmentAccredited">
                    Government Accredited Hospital
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h2>Additional Information</h2>
            <div className="form-divider"></div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="description">Hospital Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  placeholder="Provide a brief description about your hospital, its history, mission, and vision"
                ></textarea>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="logo">Hospital Logo</label>
                <div className="file-input-container">
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={handleInputChange}
                    accept="image/*"
                  />
                  <div className="file-input-label">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <span>Choose file or drag & drop</span>
                  </div>
                  {formData.logo && (
                    <div className="file-name">
                      {formData.logo.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Submission */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group full-width">
                <div className="checkbox-item terms-checkbox">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="acceptTerms">
                    I agree to the <a href="/terms" target="_blank">Terms and Conditions</a> and certify that all information provided is accurate and complete
                  </label>
                </div>
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => window.history.back()}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={!formData.acceptTerms}>
                Submit Registration
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default HospitalRegistration;