import React, { useState, useEffect, useRef } from 'react';

function DoctorDashboard() {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [patients, setPatients] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [profileImage, setProfileImage] = useState('/api/placeholder/150/150');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Demo doctor information
    const demoDoctorInfo = {
      doctorId: 'DOC001',
      fullName: 'Sarah Johnson',
      specialization: 'Cardiologist',
      email: 'sarah.johnson@hospital.com',
      phone: '+1 (555) 123-4567',
      experience: '8 years'
    };
    
    setDoctorInfo(demoDoctorInfo);
    
    // Demo patients data
    const demoPatients = [
      {
        id: 1,
        patientId: 'PAT001',
        name: 'Emily Chen',
        condition: 'Hypertension',
        lastVisit: '2024-05-28',
        status: 'Active'
      },
      {
        id: 2,
        patientId: 'PAT002',
        name: 'John Doe',
        condition: 'Diabetes Type 2',
        lastVisit: '2024-05-25',
        status: 'Follow-up'
      },
      {
        id: 3,
        patientId: 'PAT003',
        name: 'Maria Rodriguez',
        condition: 'Cardiac Arrhythmia',
        lastVisit: '2024-05-22',
        status: 'Active'
      },
      {
        id: 4,
        patientId: 'PAT004',
        name: 'David Wilson',
        condition: 'Heart Disease',
        lastVisit: '2024-05-20',
        status: 'Monitoring'
      }
    ];
    
    setPatients(demoPatients);
  }, []);

  const handleLogout = () => {
    // Demo logout - just refresh the page or redirect
    window.location.reload();
  };

  // Profile Photo Functions
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        // Here you would typically upload to server
        console.log('Profile photo updated:', file.name);
        alert('Profile photo updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  // Password Change Functions
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific error when user starts typing
    if (passwordErrors[field]) {
      setPasswordErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validatePassword = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      errors.newPassword = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (passwordData.currentPassword === passwordData.newPassword) {
      errors.newPassword = 'New password must be different from current password';
    }
    
    return errors;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validatePassword();
    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }
    
    setIsUpdatingProfile(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make actual API call to change password
      console.log('Password change request:', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      alert('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordErrors({});
      
    } catch (error) {
      alert('Failed to change password. Please try again.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleProfileSave = async () => {
    setIsUpdatingProfile(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would make actual API call to save profile
      console.log('Profile save request:', doctorInfo);
      
      alert('Profile updated successfully!');
      
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const renderDashboardHome = () => (
    <div className="dashboard-home">
      <h1>Welcome back, Dr. {doctorInfo?.fullName}</h1>
      
      {/* Stats Container */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon appointments-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-info">
            <h3>Today's Appointments</h3>
            <p>8</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon patients-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p>{patients.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon doctors-icon">
            <i className="fas fa-stethoscope"></i>
          </div>
          <div className="stat-info">
            <h3>Pending Prescriptions</h3>
            <p>3</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon occupancy-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="stat-info">
            <h3>This Week</h3>
            <p>42</p>
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="dashboard-overview">
        <div className="upcoming-appointments">
          <div className="section-header">
            <h2>Today's Appointments</h2>
            <span className="view-all" onClick={() => setActiveSection('appointments')}>View All</span>
          </div>
          <div className="appointments-list">
            <div className="appointment-card">
              <div className="appointment-time">09:00</div>
              <div className="appointment-details">
                <h4>Emily Chen</h4>
                <p>Regular Checkup - Hypertension</p>
              </div>
              <div className="appointment-status confirmed">Confirmed</div>
            </div>
            <div className="appointment-card">
              <div className="appointment-time">10:30</div>
              <div className="appointment-details">
                <h4>John Doe</h4>
                <p>Follow-up - Diabetes</p>
              </div>
              <div className="appointment-status pending">Pending</div>
            </div>
            <div className="appointment-card">
              <div className="appointment-time">14:00</div>
              <div className="appointment-details">
                <h4>Maria Rodriguez</h4>
                <p>Consultation - Cardiac Issues</p>
              </div>
              <div className="appointment-status confirmed">Confirmed</div>
            </div>
          </div>
        </div>

        <div className="recent-patients">
          <div className="section-header">
            <h2>Recent Patient Activities</h2>
            <span className="view-all" onClick={() => setActiveSection('patients')}>View All</span>
          </div>
          <div className="activities-list">
            <div className="appointment-card">
              <div className="appointment-time">2h ago</div>
              <div className="appointment-details">
                <h4>Prescribed medication</h4>
                <p>Emily Chen - Hypertension medication updated</p>
              </div>
            </div>
            <div className="appointment-card">
              <div className="appointment-time">4h ago</div>
              <div className="appointment-details">
                <h4>Follow-up scheduled</h4>
                <p>John Doe - Next appointment in 2 weeks</p>
              </div>
            </div>
            <div className="appointment-card">
              <div className="appointment-time">1d ago</div>
              <div className="appointment-details">
                <h4>Test results reviewed</h4>
                <p>Maria Rodriguez - ECG results normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="patients-page">
      <h1>My Patients</h1>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Condition</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.patientId}</td>
                <td>{patient.name}</td>
                <td>{patient.condition}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <span className={`appointment-status ${patient.status.toLowerCase()}`}>
                    {patient.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="view-button" title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="edit-button" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="appointments-page">
      <h1>Appointments</h1>
      <div className="appointments-list">
        <div className="appointment-card">
          <div className="appointment-time">09:00 AM</div>
          <div className="appointment-details">
            <h4>Emily Chen</h4>
            <p>Regular Checkup - Room 205</p>
          </div>
          <div className="appointment-status confirmed">Confirmed</div>
        </div>
        <div className="appointment-card">
          <div className="appointment-time">10:30 AM</div>
          <div className="appointment-details">
            <h4>John Doe</h4>
            <p>Follow-up Consultation - Room 207</p>
          </div>
          <div className="appointment-status pending">Pending</div>
        </div>
        <div className="appointment-card">
          <div className="appointment-time">02:00 PM</div>
          <div className="appointment-details">
            <h4>Maria Rodriguez</h4>
            <p>Cardiac Consultation - Room 203</p>
          </div>
          <div className="appointment-status confirmed">Confirmed</div>
        </div>
        <div className="appointment-card">
          <div className="appointment-time">03:30 PM</div>
          <div className="appointment-details">
            <h4>David Wilson</h4>
            <p>Heart Disease Follow-up - Room 205</p>
          </div>
          <div className="appointment-status confirmed">Confirmed</div>
        </div>
      </div>
    </div>
  );

  // Password Change Modal
  const renderPasswordModal = () => (
    showPasswordModal && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Change Password</h2>
            <button
              onClick={() => setShowPasswordModal(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handlePasswordSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Current Password
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${passwordErrors.currentPassword ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem'
                }}
                placeholder="Enter current password"
              />
              {passwordErrors.currentPassword && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {passwordErrors.currentPassword}
                </p>
              )}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${passwordErrors.newPassword ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem'
                }}
                placeholder="Enter new password"
              />
              {passwordErrors.newPassword && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {passwordErrors.newPassword}
                </p>
              )}
              <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Password must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${passwordErrors.confirmPassword ? '#ef4444' : '#e2e8f0'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.95rem'
                }}
                placeholder="Confirm new password"
              />
              {passwordErrors.confirmPassword && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: '#f8fafc',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUpdatingProfile}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '0.5rem',
                  background: isUpdatingProfile ? '#94a3b8' : '#138808',
                  color: 'white',
                  cursor: isUpdatingProfile ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                {isUpdatingProfile ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  const renderProfile = () => (
    <div className="profile-page">
      <h1>Doctor Profile</h1>
      <div className="profile-container">
        <div className="profile-image-section">
          <img 
            src={profileImage} 
            alt={`Dr. ${doctorInfo?.fullName}`} 
            className="profile-image-large"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button className="change-photo-button" onClick={handlePhotoClick}>
            <i className="fas fa-camera"></i>
            Change Photo
          </button>
        </div>
        
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Doctor ID</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctorInfo?.doctorId || ''} 
                readOnly 
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctorInfo?.fullName || ''} 
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Specialization</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctorInfo?.specialization || ''} 
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, specialization: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Experience</label>
              <input 
                type="text" 
                className="form-control" 
                value={doctorInfo?.experience || ''} 
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, experience: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                className="form-control" 
                value={doctorInfo?.email || ''} 
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                className="form-control" 
                value={doctorInfo?.phone || ''} 
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="profile-actions">
            <button 
              className="save-profile-button" 
              onClick={handleProfileSave}
              disabled={isUpdatingProfile}
            >
              <i className="fas fa-save"></i>
              {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              className="change-password-button"
              onClick={() => setShowPasswordModal(true)}
            >
              <i className="fas fa-key"></i>
              Change Password
            </button>
          </div>
        </div>
      </div>
      
      {renderPasswordModal()}
    </div>
  );

  if (!doctorInfo) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="hospital-logo">
          <img 
            src="/assets/LOGO.png" 
            alt="Hospital Logo" 
            className="logo"
          />
          <h2>MediCare</h2>
        </div>
        
        <nav className="dashboard-nav">
          <div 
            className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveSection('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i>
            Dashboard
          </div>
          <div 
            className={`nav-item ${activeSection === 'patients' ? 'active' : ''}`}
            onClick={() => setActiveSection('patients')}
          >
            <i className="fas fa-users"></i>
            My Patients
          </div>
          <div 
            className={`nav-item ${activeSection === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveSection('appointments')}
          >
            <i className="fas fa-calendar-check"></i>
            Appointments
          </div>
          <div 
            className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            <i className="fas fa-user"></i>
            Profile
          </div>
        </nav>
        
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search patients, appointments..." 
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          
          <div className="user-profile">
            <div className="notifications">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </div>
            
            <div className="profile-info">
              <img 
                src={profileImage} 
                alt={`Dr. ${doctorInfo.fullName}`} 
                className="profile-image"
              />
              <span className="profile-name">Dr. {doctorInfo.fullName}</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="dashboard-main">
          {activeSection === 'dashboard' && renderDashboardHome()}
          {activeSection === 'patients' && renderPatients()}
          {activeSection === 'appointments' && renderAppointments()}
          {activeSection === 'profile' && renderProfile()}
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard;