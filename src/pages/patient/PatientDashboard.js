import React, { useState, useEffect } from 'react';
import '../patient/styles/PatientDashboard.css'; 

function PatientDashboard() {
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // Demo data
  const demoPatientInfo = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    gender: "male",
    address: "123 Main Street, City, State 12345",
    dob: "1990-05-15",
    bloodGroup: "A+",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  const demoAppointments = [
    {
      _id: "1",
      date: "2025-06-05",
      time: "10:00 AM",
      doctor: "Dr. Smith",
      specialty: "Cardiology",
      status: "confirmed"
    },
    {
      _id: "2",
      date: "2025-06-10",
      time: "2:30 PM",
      doctor: "Dr. Johnson",
      specialty: "Dermatology",
      status: "pending"
    },
    {
      _id: "3",
      date: "2025-06-15",
      time: "11:00 AM",
      doctor: "Dr. Williams",
      specialty: "Orthopedics",
      status: "confirmed"
    }
  ];

  const demoPrescriptions = [
    {
      _id: "1",
      date: "2025-05-25",
      medication: "Lisinopril 10mg",
      instructions: "Take once daily with food",
      doctor: "Dr. Smith"
    },
    {
      _id: "2",
      date: "2025-05-20",
      medication: "Metformin 500mg",
      instructions: "Take twice daily before meals",
      doctor: "Dr. Brown"
    },
    {
      _id: "3",
      date: "2025-05-15",
      medication: "Ibuprofen 200mg",
      instructions: "Take as needed for pain",
      doctor: "Dr. Johnson"
    }
  ];

  const demoMedicalRecords = [
    {
      _id: "1",
      date: "2025-05-25",
      type: "Lab Report",
      description: "Complete Blood Count",
      status: "completed"
    },
    {
      _id: "2",
      date: "2025-05-20",
      type: "X-Ray",
      description: "Chest X-Ray",
      status: "completed"
    },
    {
      _id: "3",
      date: "2025-05-15",
      type: "Consultation",
      description: "Annual Physical Exam",
      status: "completed"
    }
  ];

  const demoNotifications = [
    {
      _id: "1",
      date: "2025-05-30",
      message: "Your appointment with Dr. Smith is confirmed for June 5th",
      read: false
    },
    {
      _id: "2",
      date: "2025-05-28",
      message: "Lab results are now available",
      read: false
    },
    {
      _id: "3",
      date: "2025-05-25",
      message: "Prescription refill reminder for Lisinopril",
      read: true
    }
  ];

  useEffect(() => {
    // Simulate loading demo data
    const loadDemoData = async () => {
      setLoading(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        setPatientInfo(demoPatientInfo);
        setUpcomingAppointments(demoAppointments);
        setRecentPrescriptions(demoPrescriptions);
        setMedicalRecords(demoMedicalRecords);
        setNotifications(demoNotifications);
      } catch (error) {
        console.error('Error loading demo data:', error);
        setError('Error loading demo data. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    loadDemoData();
  }, []);

  const markNotificationAsRead = (notificationId) => {
    // Update local state for demo
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? {...notif, read: true} : notif
      )
    );
  };

  const handleImageUpload = () => {
    // Create file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Image size should be less than 5MB');
          return;
        }
        
        // Create FileReader to convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          // Update patient info with new image
          setPatientInfo(prev => ({
            ...prev,
            profileImage: imageUrl
          }));
          alert('Profile image updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  };

  const updateProfile = (profileData) => {
    // Update local state for demo
    setPatientInfo(prev => ({
      ...prev,
      ...profileData
    }));
    alert('Profile updated successfully (Demo Mode)');
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      email: e.target.email.value,
      phone: e.target.phone.value,
      gender: e.target.gender.value,
      address: e.target.address.value
    };
    
    updateProfile(formData);
  };

  const handleLogout = () => {
    // For demo, just show alert
    alert('Logout clicked (Demo Mode)');
    // In real app: window.location.href = '/patient-login';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-inner"></div>
        </div>
        <p>Loading your health information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
        <button onClick={handleLogout}>Return to Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="hospital-logo">
          <img src="/assets/LOGO.png" alt="Bharath MediCare Logo" className="logo" />
          <h2>Bharath MediCare</h2>
        </div>
        
        <div className="dashboard-nav">
          <a 
            href="#overview" 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-home"></i>
            <span>Dashboard</span>
          </a>
          <a 
            href="#appointments" 
            className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            <i className="fas fa-calendar-check"></i>
            <span>Appointments</span>
          </a>
          <a 
            href="#prescriptions" 
            className={`nav-item ${activeTab === 'prescriptions' ? 'active' : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            <i className="fas fa-prescription"></i>
            <span>Prescriptions</span>
          </a>
          <a 
            href="#records" 
            className={`nav-item ${activeTab === 'records' ? 'active' : ''}`}
            onClick={() => setActiveTab('records')}
          >
            <i className="fas fa-file-medical"></i>
            <span>Medical Records</span>
          </a>
          <a 
            href="#messages" 
            className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <i className="fas fa-comment-medical"></i>
            <span>Messages</span>
          </a>
          <a 
            href="#profile" 
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            <span>My Profile</span>
          </a>
        </div>
        
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="search-container">
            <input type="text" className="search-input" placeholder="Search..." />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="user-profile">
            <div className="notifications">
              <i className="fas fa-bell"></i>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
            </div>
            
            <div className="profile-info">
              <img 
                src={patientInfo?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"} 
                alt="Patient" 
                className="profile-image" 
              />
              <span className="profile-name">{patientInfo?.fullName || 'Patient'}</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-main">
          {activeTab === 'overview' && (
            <div className="dashboard-home">
              <h1>Welcome, {patientInfo?.fullName?.split(' ')[0] || 'Patient'}</h1>
              
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-icon appointments-icon">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Upcoming Appointments</h3>
                    <p>{upcomingAppointments.length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon patients-icon">
                    <i className="fas fa-prescription"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Active Prescriptions</h3>
                    <p>{recentPrescriptions.length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon doctors-icon">
                    <i className="fas fa-file-medical"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Medical Records</h3>
                    <p>{medicalRecords.length}</p>
                  </div>
                </div>
                
                <div className="stat-card">
                  <div className="stat-icon occupancy-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div className="stat-info">
                    <h3>Notifications</h3>
                    <p>{notifications.filter(n => !n.read).length}</p>
                  </div>
                </div>
              </div>
              
              <div className="dashboard-overview">
                <div className="upcoming-appointments">
                  <div className="section-header">
                    <h2>Upcoming Appointments</h2>
                    <a href="#appointments" className="view-all" onClick={() => setActiveTab('appointments')}>
                      View All
                    </a>
                  </div>
                  
                  <div className="appointments-list">
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.slice(0, 3).map(appointment => (
                        <div key={appointment._id} className="appointment-card">
                          <div className="appointment-time">
                            {appointment.time}
                          </div>
                          <div className="appointment-details">
                            <h4>{appointment.doctor}</h4>
                            <p>{appointment.specialty} • {new Date(appointment.date).toLocaleDateString()}</p>
                          </div>
                          <div className={`appointment-status ${appointment.status}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No upcoming appointments.</p>
                    )}
                  </div>
                </div>
                
                <div className="recent-patients">
                  <div className="section-header">
                    <h2>Recent Prescriptions</h2>
                    <a href="#prescriptions" className="view-all" onClick={() => setActiveTab('prescriptions')}>
                      View All
                    </a>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Medication</th>
                          <th>Doctor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPrescriptions.length > 0 ? (
                          recentPrescriptions.slice(0, 3).map(prescription => (
                            <tr key={prescription._id}>
                              <td>{new Date(prescription.date).toLocaleDateString()}</td>
                              <td>{prescription.medication}</td>
                              <td>{prescription.doctor}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No recent prescriptions.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div className="appointments-page">
              <div className="section-header with-action">
                <h1>My Appointments</h1>
                <button className="action-button">Book New Appointment</button>
              </div>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Doctor</th>
                      <th>Specialty</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingAppointments.length > 0 ? (
                      upcomingAppointments.map(appointment => (
                        <tr key={appointment._id}>
                          <td>{new Date(appointment.date).toLocaleDateString()}</td>
                          <td>{appointment.time}</td>
                          <td>{appointment.doctor}</td>
                          <td>{appointment.specialty}</td>
                          <td>
                            <span className={`appointment-status ${appointment.status}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="view-button">
                                <i className="fas fa-eye"></i>
                              </button>
                              {appointment.status !== 'cancelled' && (
                                <>
                                  <button className="edit-button">
                                    <i className="fas fa-edit"></i>
                                  </button>
                                  <button className="delete-button">
                                    <i className="fas fa-times"></i>
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No appointments scheduled.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'prescriptions' && (
            <div className="reports-page">
              <h1>My Prescriptions</h1>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Medication</th>
                      <th>Instructions</th>
                      <th>Prescribed By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPrescriptions.length > 0 ? (
                      recentPrescriptions.map(prescription => (
                        <tr key={prescription._id}>
                          <td>{new Date(prescription.date).toLocaleDateString()}</td>
                          <td>{prescription.medication}</td>
                          <td>{prescription.instructions}</td>
                          <td>{prescription.doctor}</td>
                          <td>
                            <div className="action-buttons">
                              <button className="view-button">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="edit-button">
                                <i className="fas fa-print"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No prescriptions found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'records' && (
            <div className="reports-page">
              <h1>Medical Records</h1>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicalRecords.length > 0 ? (
                      medicalRecords.map(record => (
                        <tr key={record._id}>
                          <td>{new Date(record.date).toLocaleDateString()}</td>
                          <td>{record.type}</td>
                          <td>{record.description}</td>
                          <td>
                            <span className={`appointment-status ${record.status}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="view-button">
                                <i className="fas fa-eye"></i>
                              </button>
                              <button className="edit-button">
                                <i className="fas fa-download"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No medical records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div className="reports-page">
              <h1>Messages & Notifications</h1>
              
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <tr key={notification._id} style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                          <td>{new Date(notification.date).toLocaleDateString()}</td>
                          <td>{notification.message}</td>
                          <td>
                            <span className={`notification-status ${notification.read ? 'read' : 'unread'}`}>
                              {notification.read ? 'Read' : 'Unread'}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button className="view-button">
                                <i className="fas fa-eye"></i>
                              </button>
                              {!notification.read && (
                                <button 
                                  className="mark-read-button"
                                  onClick={() => markNotificationAsRead(notification._id)}
                                >
                                  <i className="fas fa-check"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No notifications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="profile-page">
              <h1>My Profile</h1>
              
              <div className="profile-container">
                <div className="profile-image-section">
                  <img 
                    src={patientInfo?.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"} 
                    alt="Patient" 
                    className="profile-image-large" 
                  />
                  <button className="change-photo-button" onClick={handleImageUpload}>
                    <i className="fas fa-camera"></i> Change Photo
                  </button>
                </div>
                
                <div className="profile-details-section">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input 
                          type="text" 
                          id="fullName" 
                          value={patientInfo?.fullName || ''} 
                          readOnly
                          className="form-control"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input 
                          type="text" 
                          id="dob" 
                          value={patientInfo?.dob 
                            ? new Date(patientInfo.dob).toLocaleDateString() 
                            : ''}
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          defaultValue={patientInfo?.email || ''} 
                          className="form-control"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          defaultValue={patientInfo?.phone || ''} 
                          className="form-control"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select 
                          id="gender" 
                          defaultValue={patientInfo?.gender || ''} 
                          className="form-control"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <input 
                          type="text" 
                          id="bloodGroup" 
                          value={patientInfo?.bloodGroup || ''} 
                          readOnly
                          className="form-control"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group full-width">
                      <label htmlFor="address">Address</label>
                      <textarea 
                        id="address" 
                        defaultValue={patientInfo?.address || ''} 
                        className="form-control"
                        rows="3"
                      ></textarea>
                    </div>
                    
                    <div className="profile-actions">
                      <button type="submit" className="save-profile-button">
                        <i className="fas fa-save"></i> Save Changes
                      </button>
                      <button type="button" className="change-password-button">
                        <i className="fas fa-lock"></i> Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;