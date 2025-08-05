import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, faClock, faUser, faCalendarPlus, 
  faCalendarTimes, faChevronLeft, faChevronRight, 
  faEye, faTimes, faPrint, faHospital, faStethoscope
} from '@fortawesome/free-solid-svg-icons';
import './styles/Appointment.css';

const Appointment = () => {
  // State management
  const [currentSection, setCurrentSection] = useState('booking');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerActive, setDatePickerActive] = useState(false);
  const [printModalActive, setPrintModalActive] = useState(false);
  const [cancelModalActive, setCancelModalActive] = useState(false);
  
  // Form state with simpler structure
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    city: '',
    hospital: '',
    consultationMode: '',
    appointmentType: '',
    department: '',
    appointmentDate: ''
  });
  
  // Form errors
  const [formErrors, setFormErrors] = useState({});
  
  // Simplified data for cities and hospitals
  const cities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur']
  };
  
  const hospitals = {
    'Bengaluru': ['Apollo Hospital', 'Fortis Hospital', 'Manipal Hospital'],
    'Mumbai': ['Lilavati Hospital', 'Kokilaben Hospital', 'Fortis Hospital'],
    'Ahmedabad': ['Sterling Hospital', 'Civil Hospital', 'Zydus Hospital'],
    'Visakhapatnam': ['Apollo Hospital', 'KIMS Hospital', 'Seven Hills Hospital']
  };

  // Load appointments from localStorage
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(storedAppointments);
    
    // Handle hash changes to switch between booking and managing
    const handleHashChange = () => {
      const hash = window.location.hash || '#';
      if (hash === '#manage') {
        setCurrentSection('manage');
      } else {
        setCurrentSection('booking');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
    
    // Clear the error for this field
    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: ''
      });
    }
    
    // Special handling for state and city dropdowns
    if (id === 'state') {
      setFormData(prev => ({
        ...prev,
        city: '',
        hospital: ''
      }));
    } else if (id === 'city') {
      setFormData(prev => ({
        ...prev,
        hospital: ''
      }));
    }
  };
  
  // Validate form with clear error messages
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name) {
      errors.name = 'Please enter your name';
    }
    
    if (!formData.phone) {
      errors.phone = 'Please enter your phone number';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.state) errors.state = 'Please select a state';
    if (!formData.city) errors.city = 'Please select a city';
    if (!formData.hospital) errors.hospital = 'Please select a hospital';
    if (!formData.consultationMode) errors.consultationMode = 'Please select how you want to consult';
    if (!formData.appointmentType) errors.appointmentType = 'Please select appointment type';
    if (!formData.department) errors.department = 'Please select a department';
    if (!formData.appointmentDate) errors.appointmentDate = 'Please select an appointment date';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Submit appointment with success feedback
  const submitAppointment = () => {
    if (!validateForm()) return;
    
    const appointmentData = {
      id: Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      ...formData,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };
    
    const updatedAppointments = [...appointments, appointmentData];
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    // Show success toast
    showToast('Success!', `Your appointment is confirmed! ID: ${appointmentData.id}`, 'success');
    
    // Reset form
    setFormData({
      name: '',
      phone: '',
      state: '',
      city: '',
      hospital: '',
      consultationMode: '',
      appointmentType: '',
      department: '',
      appointmentDate: ''
    });
    setSelectedDate(null);
    
    // Redirect to manage section after a short delay
    setTimeout(() => {
      window.location.hash = '#manage';
    }, 2000);
  };
  
  // Toast notifications system
  const [toasts, setToasts] = useState([]);
  
  const showToast = (title, message, type = 'default') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Calendar functions
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const calendarDays = [];
    
    // Add previous month's days
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div key={`prev-${i}`} className="date-picker-day other-month"></div>);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(year, month, i);
      const isDisabled = dayDate < today;
      const isSelected = selectedDate && 
                         selectedDate.getDate() === i && 
                         selectedDate.getMonth() === month && 
                         selectedDate.getFullYear() === year;
      
      calendarDays.push(
        <div 
          key={`day-${i}`}
          className={`date-picker-day current-month ${isDisabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (!isDisabled) {
              const newSelectedDate = new Date(year, month, i);
              setSelectedDate(newSelectedDate);
              setFormData(prev => ({
                ...prev,
                appointmentDate: formatDate(newSelectedDate)
              }));
              setDatePickerActive(false);
            }
          }}
        >
          {i}
        </div>
      );
    }
    
    return {
      monthName: `${monthNames[month]} ${year}`,
      calendarDays
    };
  };
  
  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };
  
  // Date formatting helpers
  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  const formatDateForDisplay = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  // Cancel appointment with confirmation
  const cancelAppointment = () => {
    if (!selectedAppointmentId) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointmentId 
        ? { ...appointment, status: 'Cancelled' }
        : appointment
    );
    
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    
    setCancelModalActive(false);
    showToast('Appointment Cancelled', 'Your appointment has been cancelled successfully.', 'info');
  };
  
  // Get filtered appointments
  const getFilteredAppointments = () => {
    if (currentFilter === 'confirmed') {
      return appointments.filter(a => a.status === 'Confirmed');
    } else if (currentFilter === 'cancelled') {
      return appointments.filter(a => a.status === 'Cancelled');
    }
    return appointments;
  };
  
  // Calendar data
  const { monthName, calendarDays } = renderCalendar();
  
  // Get selected appointment
  const selectedAppointment = appointments.find(a => a.id === selectedAppointmentId);
  
  // Get filtered appointments
  const filteredAppointments = getFilteredAppointments();
  
  return (
    <>
      {/* Navigation bar with clearer icons */}
      <nav className="nav">
        <div className="container nav-container">
          <a href="#" className="logo">
            <FontAwesomeIcon icon={faHospital} className="logo-icon" />
            <span>MediBook</span>
          </a>
          <div className="nav-links">
            <a href="#" className={`nav-link ${currentSection === 'booking' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCalendarPlus} />
              <span>Book New</span>
            </a>
            <a href="#manage" className={`nav-link ${currentSection === 'manage' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faClock} />
              <span>My Appointments</span>
            </a>
          </div>
          <a href="#" className="sign-in">
            <FontAwesomeIcon icon={faUser} />
            <span>Sign In</span>
          </a>
        </div>
      </nav>

      {/* Hero section with clearer messaging */}
      <div className="hero">
        <div className="container">
          <h1>Quick Medical Appointments</h1>
          <p>Book your doctor appointment in just a few clicks</p>
        </div>
      </div>

      {/* Main content */}
      <div className="container main-content">
        {/* Booking Section */}
        {currentSection === 'booking' && (
          <div id="booking-section">
            <div className="card booking-card">
              <div className="card-header">
                <h2 className="card-title">
                  <FontAwesomeIcon icon={faStethoscope} /> Book Your Doctor Visit
                </h2>
                <p className="card-description">Fill in your details below to schedule an appointment</p>
              </div>
              <div className="card-body">
                <form id="appointment-form" className="form">
                  {/* Personal Info */}
                  <div className="form-section">
                    <h3 className="form-section-title">Your Information</h3>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          className={`form-input ${formErrors.name ? 'error' : ''}`}
                          placeholder="Enter your full name" 
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className={`form-input ${formErrors.phone ? 'error' : ''}`}
                          placeholder="Enter your 10-digit mobile" 
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {formErrors.phone && <div className="form-error">{formErrors.phone}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Location Selection */}
                  <div className="form-section">
                    <h3 className="form-section-title">Hospital Location</h3>
                    
                    <div className="form-row form-row-3">
                      <div className="form-group">
                        <label htmlFor="state" className="form-label">State</label>
                        <select 
                          id="state" 
                          className={`form-select ${formErrors.state ? 'error' : ''}`}
                          value={formData.state}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose your state</option>
                          {Object.keys(cities).map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {formErrors.state && <div className="form-error">{formErrors.state}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="city" className="form-label">City</label>
                        <select 
                          id="city" 
                          className={`form-select ${formErrors.city ? 'error' : ''}`}
                          disabled={!formData.state}
                          value={formData.city}
                          onChange={handleInputChange}
                        >
                          <option value="">Choose your city</option>
                          {formData.state && cities[formData.state]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        {formErrors.city && <div className="form-error">{formErrors.city}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="hospital" className="form-label">Hospital</label>
                        <select 
                          id="hospital" 
                          className={`form-select ${formErrors.hospital ? 'error' : ''}`}
                          disabled={!formData.city}
                          value={formData.hospital}
                          onChange={handleInputChange}
                        >
                          <option value="">Select hospital</option>
                          {formData.city && hospitals[formData.city]?.map(hospital => (
                            <option key={hospital} value={hospital}>{hospital}</option>
                          ))}
                        </select>
                        {formErrors.hospital && <div className="form-error">{formErrors.hospital}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Appointment Details */}
                  <div className="form-section">
                    <h3 className="form-section-title">Appointment Details</h3>
                    
                    <div className="form-row form-row-3">
                      <div className="form-group">
                        <label htmlFor="consultationMode" className="form-label">How do you want to consult?</label>
                        <select 
                          id="consultationMode" 
                          className={`form-select ${formErrors.consultationMode ? 'error' : ''}`}
                          value={formData.consultationMode}
                          onChange={handleInputChange}
                        >
                          <option value="">Select mode</option>
                          <option value="In-Person">Visit in person</option>
                          <option value="Video Consultation">Video call</option>
                          <option value="Phone Consultation">Phone call</option>
                        </select>
                        {formErrors.consultationMode && <div className="form-error">{formErrors.consultationMode}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="appointmentType" className="form-label">Visit Type</label>
                        <select 
                          id="appointmentType" 
                          className={`form-select ${formErrors.appointmentType ? 'error' : ''}`}
                          value={formData.appointmentType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select type</option>
                          <option value="New Patient">First visit</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Specialist Consultation">Specialist visit</option>
                          <option value="Emergency">Urgent care</option>
                        </select>
                        {formErrors.appointmentType && <div className="form-error">{formErrors.appointmentType}</div>}
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="department" className="form-label">Department/Specialty</label>
                        <select 
                          id="department" 
                          className={`form-select ${formErrors.department ? 'error' : ''}`}
                          value={formData.department}
                          onChange={handleInputChange}
                        >
                          <option value="">Select department</option>
                          <option value="Cardiology">Cardiology (Heart)</option>
                          <option value="Dermatology">Dermatology (Skin)</option>
                          <option value="Neurology">Neurology (Brain)</option>
                          <option value="Orthopedics">Orthopedics (Bones)</option>
                          <option value="Pediatrics">Pediatrics (Children)</option>
                          <option value="General Medicine">General Medicine</option>
                          <option value="Ophthalmology">Ophthalmology (Eyes)</option>
                          <option value="ENT">ENT (Ear, Nose, Throat)</option>
                        </select>
                        {formErrors.department && <div className="form-error">{formErrors.department}</div>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Date picker with improved UI */}
                  <div className="form-section">
                    <h3 className="form-section-title">When would you like to visit?</h3>
                    
                    <div className="form-group">
                      <label htmlFor="appointmentDate" className="form-label">Select Date</label>
                      <div className="date-picker-wrapper">
                        <button 
                          type="button" 
                          className={`date-picker-btn ${formErrors.appointmentDate ? 'error' : ''}`}
                          onClick={() => setDatePickerActive(prev => !prev)}
                        >
                          <span>{selectedDate ? formatDateForDisplay(selectedDate) : 'Click to select a date'}</span>
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </button>
                        <input 
                          type="hidden" 
                          id="appointmentDate"
                          value={formData.appointmentDate}
                          onChange={handleInputChange}
                        />
                        <div className={`date-picker ${datePickerActive ? 'active' : ''}`}>
                          <div className="date-picker-header">
                            <button type="button" className="date-picker-btn-nav" onClick={prevMonth}>
                              <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <div className="date-picker-month">{monthName}</div>
                            <button type="button" className="date-picker-btn-nav" onClick={nextMonth}>
                              <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                          </div>
                          <div className="date-picker-weekdays">
                            <div className="date-picker-weekday">Su</div>
                            <div className="date-picker-weekday">Mo</div>
                            <div className="date-picker-weekday">Tu</div>
                            <div className="date-picker-weekday">We</div>
                            <div className="date-picker-weekday">Th</div>
                            <div className="date-picker-weekday">Fr</div>
                            <div className="date-picker-weekday">Sa</div>
                          </div>
                          <div className="date-picker-days">
                            {calendarDays}
                          </div>
                        </div>
                      </div>
                      {formErrors.appointmentDate && <div className="form-error">{formErrors.appointmentDate}</div>}
                    </div>
                  </div>
                </form>
              </div>
              <div className="card-footer">
                <button type="button" className="btn btn-primary" onClick={submitAppointment}>
                  <FontAwesomeIcon icon={faCalendarPlus} />
                  Book My Appointment
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Manage Section with improved UI */}
        {currentSection === 'manage' && (
          <div id="manage-section">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">
                  <FontAwesomeIcon icon={faClock} /> My Appointments
                </h2>
                <p className="card-description">View or manage your upcoming and past appointments</p>
              </div>
              <div className="card-body">
                <div className="tab-nav">
                  <button 
                    type="button" 
                    className={`tab-btn ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('all')}
                  >
                    All
                  </button>
                  <button 
                    type="button" 
                    className={`tab-btn ${currentFilter === 'confirmed' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('confirmed')}
                  >
                    Upcoming
                  </button>
                  <button 
                    type="button" 
                    className={`tab-btn ${currentFilter === 'cancelled' ? 'active' : ''}`}
                    onClick={() => setCurrentFilter('cancelled')}
                  >
                    Cancelled
                  </button>
                </div>
                
                {filteredAppointments.length === 0 ? (
                  <div className="no-appointments">
                    <div className="empty-state">
                      <FontAwesomeIcon icon={faCalendarTimes} className="empty-icon" />
                      <h3>No appointments found</h3>
                      <p>You don't have any {currentFilter !== 'all' ? currentFilter : ''} appointments yet.</p>
                      <button className="btn btn-primary" onClick={() => window.location.hash = ''}>
                        Book Your First Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="appointment-list">
                    {filteredAppointments.map(appointment => (
                      <div key={appointment.id} className={`appointment-card ${appointment.status.toLowerCase()}`}>
                        <div className="appointment-header">
                          <div className="appointment-id">Appointment #{appointment.id}</div>
                          <div className={`appointment-status status-${appointment.status.toLowerCase()}`}>
                            {appointment.status}
                          </div>
                        </div>
                        <div className="appointment-body">
                          <div className="appointment-main-details">
                            <div className="appointment-hospital">{appointment.hospital}</div>
                            <div className="appointment-department">{appointment.department}</div>
                          </div>
                          <div className="appointment-secondary-details">
                            <div className="appointment-date">
                              <FontAwesomeIcon icon={faCalendarAlt} />
                              {formatDateForDisplay(new Date(appointment.appointmentDate))}
                            </div>
                            <div className="appointment-type">{appointment.appointmentType}</div>
                            <div className="appointment-mode">{appointment.consultationMode}</div>
                          </div>
                        </div>
                        <div className="appointment-footer">
                          <button 
                            type="button" 
                            className="btn btn-outline"
                            onClick={() => viewAppointmentDetails(appointment.id)}
                          >
                            <FontAwesomeIcon icon={faEye} />
                            View Details
                          </button>
                          
                          {appointment.status === 'Confirmed' && (
                            <button 
                              type="button" 
                              className="btn btn-danger"
                              onClick={() => {
                                setSelectedAppointmentId(appointment.id);
                                setCancelModalActive(true);
                              }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-info">
            <h3 className="footer-title">MediBook</h3>
            <p className="footer-text">Quick and simple doctor appointments</p>
          </div>
          <div className="footer-links">
            <div className="footer-link-group">
              <h4>Quick Links</h4>
              <ul className="footer-link-list">
                <li><a href="#" className="footer-link">Book Appointment</a></li>
                <li><a href="#manage" className="footer-link">My Appointments</a></li>
                <li><a href="#" className="footer-link">Find Doctors</a></li>
                <li><a href="#" className="footer-link">Health Tips</a></li>
              </ul>
            </div>
            <div className="footer-link-group">
              <h4>Contact Us</h4>
              <ul className="footer-link-list">
                <li className="footer-text">help@medibook.example</li>
                <li className="footer-text">+1 (800) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} MediBook. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Print Modal - Improved design */}
      {printModalActive && selectedAppointment && (
        <div className="modal-backdrop active">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Appointment Details</h3>
              <button 
                type="button" 
                className="modal-close"
                onClick={() => setPrintModalActive(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body print-content">
              <div className="print-header">
                <div className="print-logo">
                  <FontAwesomeIcon icon={faHospital} />
                  <h2>MediBook</h2>
                </div>
                <div className="print-appointment-id">
                  <strong>Appointment ID:</strong> {selectedAppointment.id}
                </div>
              </div>
              
              <div className="print-section">
                <h3>Patient Information</h3>
                <div className="print-info-grid">
                  <div className="print-info-item">
                    <span className="print-label">Name:</span>
                    <span className="print-value">{selectedAppointment.name}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Phone:</span>
                    <span className="print-value">{selectedAppointment.phone}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Status:</span>
                    <span className={`print-value status-${selectedAppointment.status.toLowerCase()}`}>
                      {selectedAppointment.status}
                    </span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Booked On:</span>
                    <span className="print-value">{new Date(selectedAppointment.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="print-section">
                <h3>Appointment Details</h3>
                <div className="print-info-grid">
                  <div className="print-info-item">
                    <span className="print-label">Date:</span>
                    <span className="print-value">{formatDateForDisplay(new Date(selectedAppointment.appointmentDate))}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Hospital:</span>
                    <span className="print-value">{selectedAppointment.hospital}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Department:</span>
                    <span className="print-value">{selectedAppointment.department}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Consultation:</span>
                    <span className="print-value">{selectedAppointment.consultationMode}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Type:</span>
                    <span className="print-value">{selectedAppointment.appointmentType}</span>
                  </div>
                  <div className="print-info-item">
                    <span className="print-label">Location:</span>
                    <span className="print-value">{selectedAppointment.city}, {selectedAppointment.state}</span>
                  </div>
                </div>
              </div>
              
              <div className="print-footer">
                <p>Please arrive 15 minutes before your scheduled appointment time.</p>
                <p>For any changes, please contact the hospital directly at least 24 hours before.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setPrintModalActive(false)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => window.print()}
              >
                <FontAwesomeIcon icon={faPrint} />
                Print
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Cancel Modal - Improved design */}
      {cancelModalActive && selectedAppointment && (
        <div className="modal-backdrop active">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Cancel Appointment</h3>
              <button 
                type="button" 
                className="modal-close"
                onClick={() => setCancelModalActive(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="cancel-warning">
                <div className="cancel-icon">
                  <FontAwesomeIcon icon={faCalendarTimes} />
                </div>
                <h4>Are you sure you want to cancel this appointment?</h4>
                <p>This action cannot be undone. Your appointment at {selectedAppointment.hospital} on {formatDateForDisplay(new Date(selectedAppointment.appointmentDate))} will be cancelled.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => setCancelModalActive(false)}
              >
                Keep Appointment
              </button>
              <button 
                type="button" 
                className="btn btn-danger"
                onClick={cancelAppointment}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast Notifications - Improved design */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-header">
              <h4 className="toast-title">{toast.title}</h4>
              <button 
                type="button" 
                className="toast-close"
                onClick={() => removeToast(toast.id)}
              >
                &times;
              </button>
            </div>
            <div className="toast-body">
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </>
  );
  
  // Function to view appointment details
  const viewAppointmentDetails = (id) => {
    setSelectedAppointmentId(id);
    setPrintModalActive(true);
  };
};

export default Appointment;