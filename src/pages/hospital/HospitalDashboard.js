import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './styles/HospitalDashboard.css';

// Mock data for demonstration
const initialPatients = [
  { id: 1, name: "John Doe", age: 45, gender: "Male", condition: "Hypertension", admissionDate: "2025-03-15" },
  { id: 2, name: "Jane Smith", age: 32, gender: "Female", condition: "Pregnancy", admissionDate: "2025-03-18" },
];

const initialDoctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialization: "Cardiology", contact: "9876543210", email: "sarah@hospital.com" },
  { id: 2, name: "Dr. Michael Lee", specialization: "Pediatrics", contact: "8765432109", email: "michael@hospital.com" },
];

// Main Dashboard Component
function HospitalDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const handleLogout = () => {
    // Clear any auth tokens or session data
    navigate("/hospital-login");
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <div className="hospital-logo">
          <h2>Hospital Portal</h2>
        </div>
        
        <nav className="dashboard-nav">
          <Link 
            to="/hospital-dashboard" 
            className={activeTab === "dashboard" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("dashboard")}
          >
            <i className="fas fa-home"></i> Dashboard
          </Link>
          <Link 
            to="/hospital-dashboard/patients" 
            className={activeTab === "patients" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("patients")}
          >
            <i className="fas fa-user-injured"></i> Patients
          </Link>
          <Link 
            to="/hospital-dashboard/doctors" 
            className={activeTab === "doctors" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("doctors")}
          >
            <i className="fas fa-user-md"></i> Doctors
          </Link>
          <Link 
            to="/hospital-dashboard/appointments" 
            className={activeTab === "appointments" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("appointments")}
          >
            <i className="fas fa-calendar-check"></i> Appointments
          </Link>
          <Link 
            to="/hospital-dashboard/reports" 
            className={activeTab === "reports" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("reports")}
          >
            <i className="fas fa-chart-bar"></i> Reports
          </Link>
          <Link 
            to="/hospital-dashboard/settings" 
            className={activeTab === "settings" ? "nav-item active" : "nav-item"} 
            onClick={() => setActiveTab("settings")}
          >
            <i className="fas fa-cog"></i> Settings
          </Link>
        </nav>
        
        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input" />
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
              <img src="/api/placeholder/40/40" alt="Admin" className="profile-image" />
              <span className="profile-name">Admin User</span>
            </div>
          </div>
        </header>
        
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/patients" element={<PatientManagement />} />
            <Route path="/doctors" element={<DoctorManagement />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// Dashboard Home Component
function DashboardHome() {
  // In a real app, these would be fetched from your backend
  const stats = {
    totalPatients: 247,
    totalDoctors: 32,
    appointmentsToday: 85,
    occupancyRate: "76%"
  };
  
  return (
    <div className="dashboard-home">
      <h1>Hospital Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon patients-icon">
            <i className="fas fa-user-injured"></i>
          </div>
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p>{stats.totalPatients}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon doctors-icon">
            <i className="fas fa-user-md"></i>
          </div>
          <div className="stat-info">
            <h3>Total Doctors</h3>
            <p>{stats.totalDoctors}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon appointments-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="stat-info">
            <h3>Today's Appointments</h3>
            <p>{stats.appointmentsToday}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon occupancy-icon">
            <i className="fas fa-bed"></i>
          </div>
          <div className="stat-info">
            <h3>Bed Occupancy</h3>
            <p>{stats.occupancyRate}</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-overview">
        <div className="recent-patients">
          <div className="section-header">
            <h2>Recent Patients</h2>
            <Link to="/hospital-dashboard/patients" className="view-all">View All</Link>
          </div>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Condition</th>
                  <th>Admitted</th>
                </tr>
              </thead>
              <tbody>
                {initialPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>#{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.condition}</td>
                    <td>{patient.admissionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="upcoming-appointments">
          <div className="section-header">
            <h2>Today's Appointments</h2>
            <Link to="/hospital-dashboard/appointments" className="view-all">View All</Link>
          </div>
          <div className="appointments-list">
            <div className="appointment-card">
              <div className="appointment-time">09:00 AM</div>
              <div className="appointment-details">
                <h4>John Doe with Dr. Sarah Johnson</h4>
                <p>Cardiology Checkup</p>
              </div>
              <div className="appointment-status confirmed">Confirmed</div>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-time">10:30 AM</div>
              <div className="appointment-details">
                <h4>Jane Smith with Dr. Michael Lee</h4>
                <p>Prenatal Checkup</p>
              </div>
              <div className="appointment-status confirmed">Confirmed</div>
            </div>
            
            <div className="appointment-card">
              <div className="appointment-time">01:15 PM</div>
              <div className="appointment-details">
                <h4>Robert Brown with Dr. Sarah Johnson</h4>
                <p>Blood Pressure Review</p>
              </div>
              <div className="appointment-status pending">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Patient Management Component
function PatientManagement() {
  const [patients, setPatients] = useState(initialPatients);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    admissionDate: new Date().toISOString().split('T')[0]
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({
      ...newPatient,
      [name]: value
    });
  };
  
  const handleAddPatient = (e) => {
    e.preventDefault();
    const patientToAdd = {
      id: patients.length + 1,
      ...newPatient
    };
    
    setPatients([...patients, patientToAdd]);
    setNewPatient({
      name: "",
      age: "",
      gender: "",
      condition: "",
      admissionDate: new Date().toISOString().split('T')[0]
    });
    setShowAddForm(false);
  };
  
  return (
    <div className="patient-management">
      <div className="section-header with-action">
        <h1>Patient Management</h1>
        <button 
          className="action-button" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add New Patient"}
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-form-container">
          <h2>Add New Patient</h2>
          <form onSubmit={handleAddPatient} className="add-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Patient Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newPatient.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={newPatient.age}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="condition">Medical Condition</label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={newPatient.condition}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="admissionDate">Admission Date</label>
                <input
                  type="date"
                  id="admissionDate"
                  name="admissionDate"
                  value={newPatient.admissionDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Patient
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="patient-list">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Condition</th>
                <th>Admission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map(patient => (
                <tr key={patient.id}>
                  <td>#{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.condition}</td>
                  <td>{patient.admissionDate}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="view-button">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="delete-button">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Doctor Management Component
function DoctorManagement() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialization: "",
    contact: "",
    email: ""
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({
      ...newDoctor,
      [name]: value
    });
  };
  
  const handleAddDoctor = (e) => {
    e.preventDefault();
    const doctorToAdd = {
      id: doctors.length + 1,
      ...newDoctor
    };
    
    setDoctors([...doctors, doctorToAdd]);
    setNewDoctor({
      name: "",
      specialization: "",
      contact: "",
      email: ""
    });
    setShowAddForm(false);
  };
  
  return (
    <div className="doctor-management">
      <div className="section-header with-action">
        <h1>Doctor Management</h1>
        <button 
          className="action-button" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add New Doctor"}
        </button>
      </div>
      
      {showAddForm && (
        <div className="add-form-container">
          <h2>Add New Doctor</h2>
          <form onSubmit={handleAddDoctor} className="add-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Doctor Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDoctor.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="specialization">Specialization</label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={newDoctor.specialization}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={newDoctor.contact}
                  onChange={handleInputChange}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newDoctor.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="doctor-list">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor.id}>
                  <td>#{doctor.id}</td>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.contact}</td>
                  <td>{doctor.email}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="view-button">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="delete-button">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for other dashboard sections
function AppointmentsPage() {
  return <div><h1>Appointments Management</h1><p>This section is under development.</p></div>;
}

function ReportsPage() {
  return <div><h1>Reports and Analytics</h1><p>This section is under development.</p></div>;
}

function SettingsPage() {
  return <div><h1>Hospital Settings</h1><p>This section is under development.</p></div>;
}

export default HospitalDashboard;