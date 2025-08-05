import { useState, useEffect } from "react";
import { 
  User, 
  Calendar, 
  Activity, 
  FileText, 
  Pill,  
  Heart, 
  TrendingUp, 
  ArrowRight,
  MessageSquare,
  Shield 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "../styles/Patient.css";
import { useNavigate } from "react-router-dom";

export default function Patient() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [vitalTimeRange, setVitalTimeRange] = useState("week");
  const navigate = useNavigate();

  // Simulate loading patient data
  useEffect(() => {
    // In a real application, this would fetch from an API using the route parameter
    // const patientId = window.location.pathname.split('/')[2];
    
    setTimeout(() => {
      setPatient({
        id: "PT-384691",
        name: "Chandrika S S",
        age: 21,
        dob: "2004-05-15",
        gender: "Female",
        bloodType: "O+",
        weight: "42 kg",
        height: "145 cm",
        primaryDoctor: "Dr. D Naveen Kumar",
        insuranceProvider: "HealthPlus",
        insuranceNumber: "HP-78294532",
        allergies: ["Penicillin", "Latex"],
        conditions: ["Hypertension", "Type 2 Diabetes"],
        lastVisit: "2025-04-02",
        nextAppointment: "2025-04-18",
        contactNumber: "+91 8884118511",
        email: "chandrikass@email.com",
        address: "Malur Main Road",
        emergencyContact: {
          name: "Subhash Bharadwaj",
          relation: "Brother",
          phone: "+91 8296210994"
        }
      });
      setLoading(false);
    }, 1200);
  }, []);

  // Sample vital signs data
  const vitalSignsData = {
    week: [
      { day: "Mon", heartRate: 72, bloodPressureSys: 124, bloodPressureDia: 82, glucose: 105 },
      { day: "Tue", heartRate: 75, bloodPressureSys: 128, bloodPressureDia: 84, glucose: 112 },
      { day: "Wed", heartRate: 71, bloodPressureSys: 125, bloodPressureDia: 80, glucose: 108 },
      { day: "Thu", heartRate: 73, bloodPressureSys: 130, bloodPressureDia: 85, glucose: 118 },
      { day: "Fri", heartRate: 76, bloodPressureSys: 126, bloodPressureDia: 81, glucose: 110 },
      { day: "Sat", heartRate: 70, bloodPressureSys: 122, bloodPressureDia: 79, glucose: 106 },
      { day: "Sun", heartRate: 74, bloodPressureSys: 127, bloodPressureDia: 83, glucose: 109 }
    ],
    month: [
      { day: "Week 1", heartRate: 73, bloodPressureSys: 126, bloodPressureDia: 82, glucose: 108 },
      { day: "Week 2", heartRate: 74, bloodPressureSys: 128, bloodPressureDia: 83, glucose: 110 },
      { day: "Week 3", heartRate: 72, bloodPressureSys: 125, bloodPressureDia: 80, glucose: 106 },
      { day: "Week 4", heartRate: 75, bloodPressureSys: 127, bloodPressureDia: 84, glucose: 112 }
    ],
    year: [
      { day: "Jan", heartRate: 73, bloodPressureSys: 127, bloodPressureDia: 82, glucose: 109 },
      { day: "Feb", heartRate: 72, bloodPressureSys: 126, bloodPressureDia: 81, glucose: 107 },
      { day: "Mar", heartRate: 74, bloodPressureSys: 128, bloodPressureDia: 83, glucose: 110 },
      { day: "Apr", heartRate: 75, bloodPressureSys: 129, bloodPressureDia: 84, glucose: 113 },
      { day: "May", heartRate: 73, bloodPressureSys: 127, bloodPressureDia: 82, glucose: 108 },
      { day: "Jun", heartRate: 72, bloodPressureSys: 125, bloodPressureDia: 80, glucose: 106 },
      { day: "Jul", heartRate: 76, bloodPressureSys: 130, bloodPressureDia: 85, glucose: 115 },
      { day: "Aug", heartRate: 75, bloodPressureSys: 129, bloodPressureDia: 84, glucose: 114 },
      { day: "Sep", heartRate: 73, bloodPressureSys: 127, bloodPressureDia: 82, glucose: 109 },
      { day: "Oct", heartRate: 74, bloodPressureSys: 128, bloodPressureDia: 83, glucose: 111 },
      { day: "Nov", heartRate: 72, bloodPressureSys: 126, bloodPressureDia: 81, glucose: 107 },
      { day: "Dec", heartRate: 75, bloodPressureSys: 129, bloodPressureDia: 84, glucose: 112 }
    ]
  };

  // Sample medication data
  const medications = [
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", startDate: "2024-10-15", endDate: "Ongoing" },
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily (morning)", startDate: "2024-06-03", endDate: "Ongoing" },
    { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily (evening)", startDate: "2024-08-22", endDate: "Ongoing" }
  ];

  // Sample appointment history
  const appointmentHistory = [
    { date: "2025-04-02", doctor: "Dr. Martinez", type: "Regular Checkup", notes: "Blood pressure slightly elevated. Advised on dietary changes." },
    { date: "2025-03-05", doctor: "Dr. Patel", type: "Endocrinologist", notes: "Diabetes management review. Adjusted medication dosage." },
    { date: "2025-02-12", doctor: "Dr. Martinez", type: "Regular Checkup", notes: "Patient reported occasional headaches. Recommended stress management techniques." },
    { date: "2025-01-08", doctor: "Dr. Wilson", type: "Ophthalmology", notes: "Annual diabetic eye exam. No retinopathy observed." }
  ];

  // Sample upcoming appointments
  const upcomingAppointments = [
    { date: "2025-04-18", time: "10:30 AM", doctor: "Dr. Martinez", type: "Regular Checkup", location: "Main Clinic, Room 305" },
    { date: "2025-05-20", time: "02:15 PM", doctor: "Dr. Patel", type: "Endocrinologist", location: "Specialty Center, Room 112" }
  ];

  // Sample lab results 
  const labResults = [
    { date: "2025-04-02", test: "Complete Blood Count", result: "Within normal range", details: "Hemoglobin: 13.5 g/dL, WBC: 7.2k/uL" },
    { date: "2025-04-02", test: "HbA1c", result: "6.8%", details: "Improved from previous reading of 7.2%" },
    { date: "2025-04-02", test: "Lipid Panel", result: "Borderline", details: "Total Cholesterol: 215 mg/dL, LDL: 140 mg/dL, HDL: 45 mg/dL" },
    { date: "2025-03-05", test: "Comprehensive Metabolic Panel", result: "Within normal range", details: "All values within standard ranges" },
    { date: "2025-03-05", test: "Urinalysis", result: "Normal", details: "No abnormalities detected" }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading patient data...</p>
      </div>
    );
  }

  return (
    <div className="patient-dashboard">
      <header className="dashboard-header">
        <div className="patient-info-header">
          <div className="patient-avatar">
            <User size={36} />
          </div>
          <div className="patient-header-details">
            <h1>{patient.name}</h1>
            <div className="patient-id-section">
              <span className="patient-id">ID: {patient.id}</span>
              <span className="patient-dob">DOB: {patient.dob}</span>
              <span className="patient-age">{patient.age} years</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="action-button">
            <MessageSquare size={18} />
            Message
          </button>
          <button className="action-button primary">
            <Calendar size={18} />
            Schedule
          </button>
          <button className="action-button primary" onClick={() => navigate("/patient-login")}>
                <i className="fas fa-user-circle"></i> Logout
        </button>

        </div>
      </header>

      <nav className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === "vitals" ? "active" : ""}`}
          onClick={() => setActiveTab("vitals")}
        >
          Vital Signs
        </button>
        <button 
          className={`tab-button ${activeTab === "medications" ? "active" : ""}`}
          onClick={() => setActiveTab("medications")}
        >
          Medications
        </button>
        <button 
          className={`tab-button ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments
        </button>
        <button 
          className={`tab-button ${activeTab === "labresults" ? "active" : ""}`}
          onClick={() => setActiveTab("labresults")}
        >
          Lab Results
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === "overview" && (
          <div className="overview-tab">
            <div className="info-cards-container">
              <div className="info-card">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{patient.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date of Birth</span>
                    <span className="info-value">{patient.dob}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Gender</span>
                    <span className="info-value">{patient.gender}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Blood Type</span>
                    <span className="info-value">{patient.bloodType}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Height</span>
                    <span className="info-value">{patient.height}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Weight</span>
                    <span className="info-value">{patient.weight}</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">{patient.contactNumber}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{patient.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address</span>
                    <span className="info-value">{patient.address}</span>
                  </div>
                  <div className="info-item wide">
                    <span className="info-label">Emergency Contact</span>
                    <span className="info-value">
                      {patient.emergencyContact.name} ({patient.emergencyContact.relation}) - {patient.emergencyContact.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Medical Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Primary Doctor</span>
                    <span className="info-value">{patient.primaryDoctor}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Insurance</span>
                    <span className="info-value">{patient.insuranceProvider} (#{patient.insuranceNumber})</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Visit</span>
                    <span className="info-value">{patient.lastVisit}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Next Appointment</span>
                    <span className="info-value">{patient.nextAppointment}</span>
                  </div>
                  <div className="info-item wide">
                    <span className="info-label">Allergies</span>
                    <span className="info-value">
                      {patient.allergies.map((allergy, index) => (
                        <span key={index} className="tag alert">{allergy}</span>
                      ))}
                    </span>
                  </div>
                  <div className="info-item wide">
                    <span className="info-label">Conditions</span>
                    <span className="info-value">
                      {patient.conditions.map((condition, index) => (
                        <span key={index} className="tag">{condition}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="highlights-container">
              <div className="highlight-card">
                <div className="highlight-header">
                  <Heart size={20} className="highlight-icon" />
                  <h3>Recent Vitals</h3>
                </div>
                <div className="highlight-data">
                  <div className="vital-reading">
                    <span className="vital-label">Blood Pressure</span>
                    <span className="vital-value">126/81 mmHg</span>
                  </div>
                  <div className="vital-reading">
                    <span className="vital-label">Heart Rate</span>
                    <span className="vital-value">74 bpm</span>
                  </div>
                  <div className="vital-reading">
                    <span className="vital-label">Blood Glucose</span>
                    <span className="vital-value">108 mg/dL</span>
                  </div>
                </div>
                <a href="#vitals" className="highlight-link" onClick={() => setActiveTab("vitals")}>
                  View all vitals <ArrowRight size={16} />
                </a>
              </div>

              <div className="highlight-card">
                <div className="highlight-header">
                  <Pill size={20} className="highlight-icon" />
                  <h3>Current Medications</h3>
                </div>
                <div className="highlight-list">
                  {medications.slice(0, 2).map((med, index) => (
                    <div key={index} className="highlight-item">
                      <span className="highlight-title">{med.name}</span>
                      <span className="highlight-subtitle">{med.dosage} - {med.frequency}</span>
                    </div>
                  ))}
                  {medications.length > 2 && (
                    <div className="highlight-item more">
                      <span className="highlight-more">+{medications.length - 2} more medications</span>
                    </div>
                  )}
                </div>
                <a href="#medications" className="highlight-link" onClick={() => setActiveTab("medications")}>
                  View all medications <ArrowRight size={16} />
                </a>
              </div>

              <div className="highlight-card">
                <div className="highlight-header">
                  <Calendar size={20} className="highlight-icon" />
                  <h3>Upcoming Appointments</h3>
                </div>
                <div className="highlight-list">
                  {upcomingAppointments.slice(0, 2).map((appt, index) => (
                    <div key={index} className="highlight-item">
                      <span className="highlight-title">{appt.date} - {appt.time}</span>
                      <span className="highlight-subtitle">{appt.doctor} - {appt.type}</span>
                    </div>
                  ))}
                </div>
                <a href="#appointments" className="highlight-link" onClick={() => setActiveTab("appointments")}>
                  View all appointments <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === "vitals" && (
          <div className="vitals-tab">
            <div className="tab-header">
              <h2>Vital Signs</h2>
              <div className="time-range-selector">
                <button 
                  className={`time-button ${vitalTimeRange === 'week' ? 'active' : ''}`}
                  onClick={() => setVitalTimeRange('week')}
                >
                  Week
                </button>
                <button 
                  className={`time-button ${vitalTimeRange === 'month' ? 'active' : ''}`}
                  onClick={() => setVitalTimeRange('month')}
                >
                  Month
                </button>
                <button 
                  className={`time-button ${vitalTimeRange === 'year' ? 'active' : ''}`}
                  onClick={() => setVitalTimeRange('year')}
                >
                  Year
                </button>
              </div>
            </div>

            <div className="vital-charts">
              <div className="chart-card">
                <h3>Blood Pressure</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={vitalSignsData[vitalTimeRange]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bloodPressureSys" name="Systolic" stroke="#ff7300" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="bloodPressureDia" name="Diastolic" stroke="#387908" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat">
                    <span className="stat-label">Average Systolic</span>
                    <span className="stat-value">126 mmHg</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Average Diastolic</span>
                    <span className="stat-value">82 mmHg</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Status</span>
                    <span className="stat-value normal">Normal</span>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Heart Rate</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={vitalSignsData[vitalTimeRange]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="heartRate" name="BPM" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat">
                    <span className="stat-label">Average</span>
                    <span className="stat-value">74 bpm</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Range</span>
                    <span className="stat-value">70-76 bpm</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Status</span>
                    <span className="stat-value normal">Normal</span>
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h3>Blood Glucose</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={vitalSignsData[vitalTimeRange]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="glucose" name="mg/dL" stroke="#82ca9d" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-stats">
                  <div className="stat">
                    <span className="stat-label">Average</span>
                    <span className="stat-value">110 mg/dL</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Target Range</span>
                    <span className="stat-value">80-130 mg/dL</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Status</span>
                    <span className="stat-value warning">Monitor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "medications" && (
          <div className="medications-tab">
            <div className="tab-header">
              <h2>Current Medications</h2>
              <button className="action-button primary">
                <Pill size={18} />
                Add Medication
              </button>
            </div>
            
            <div className="medications-list">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medications.map((med, index) => (
                    <tr key={index}>
                      <td>{med.name}</td>
                      <td>{med.dosage}</td>
                      <td>{med.frequency}</td>
                      <td>{med.startDate}</td>
                      <td>{med.endDate}</td>
                      <td>
                        <button className="icon-button">
                          <FileText size={16} />
                        </button>
                        <button className="icon-button">
                          <Activity size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="medication-notes">
              <h3>Notes</h3>
              <div className="notes-content">
                <p>
                  <strong>Metformin:</strong> Patient reports occasional mild gastrointestinal discomfort. 
                  Advised to take with food to minimize side effects.
                </p>
                <p>
                  <strong>Lisinopril:</strong> Monitoring for dry cough side effect. 
                  None reported as of last visit (2025-04-02).
                </p>
                <p>
                  <strong>All medications:</strong> Patient has demonstrated good adherence to medication schedule.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="appointments-tab">
            <div className="appointments-container">
              <div className="upcoming-appointments">
                <div className="tab-header">
                  <h2>Upcoming Appointments</h2>
                  <button className="action-button primary">
                    <Calendar size={18} />
                    Schedule New
                  </button>
                </div>
                
                <div className="appointments-list">
                  {upcomingAppointments.map((appt, index) => (
                    <div key={index} className="appointment-card">
                      <div className="appointment-date">
                        <Calendar size={18} />
                        <div>
                          <div className="appointment-day">{appt.date}</div>
                          <div className="appointment-time">{appt.time}</div>
                        </div>
                      </div>
                      <div className="appointment-details">
                        <h4>{appt.type}</h4>
                        <p>{appt.doctor}</p>
                        <p className="appointment-location">{appt.location}</p>
                      </div>
                      <div className="appointment-actions">
                        <button className="action-button">Reschedule</button>
                        <button className="action-button outline">Cancel</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="appointment-history">
                <h2>Appointment History</h2>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Provider</th>
                      <th>Type</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointmentHistory.map((appt, index) => (
                      <tr key={index}>
                        <td>{appt.date}</td>
                        <td>{appt.doctor}</td>
                        <td>{appt.type}</td>
                        <td className="notes-cell">{appt.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "labresults" && (
          <div className="labresults-tab">
            <div className="tab-header">
              <h2>Laboratory Results</h2>
            </div>
            
            <div className="lab-results-filter">
              <div className="filter-group">
                <label>Filter by date:</label>
                <select className="filter-select">
                  <option value="all">All dates</option>
                  <option value="2025-04">April 2025</option>
                  <option value="2025-03">March 2025</option>
                  <option value="2025-02">February 2025</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Filter by type:</label>
                <select className="filter-select">
                  <option value="all">All tests</option>
                  <option value="blood">Blood tests</option>
                  <option value="urine">Urine tests</option>
                  <option value="imaging">Imaging</option>
                </select>
              </div>
            </div>

            <div className="lab-results-list">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Test</th>
                    <th>Result</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {labResults.map((lab, index) => (
                    <tr key={index}>
                      <td>{lab.date}</td>
                      <td>{lab.test}</td>
                      <td className={`result-cell ${
                        lab.result.includes("normal") || lab.result === "Normal" ? "normal" :
                        lab.result.includes("Borderline") ? "warning" : ""
                      }`}>
                        {lab.result}
                      </td>
                      <td className="details-cell">{lab.details}</td>
                      <td>
                        <button className="icon-button">
                          <FileText size={16} />
                        </button>
                        <button className="icon-button">
                          <TrendingUp size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lab-results-notes">
              <div className="notes-header">
                <h3>Physician Notes</h3>
                <span className="notes-date">Updated: April 2, 2025</span>
              </div>
              <div className="notes-content">
                <p>
                  <strong>HbA1c:</strong> Patient's HbA1c has improved from 7.2% to 6.8%, showing 
                  good progress in diabetes management. Continue current treatment plan.
                </p>
                <p>
                  <strong>Lipid Panel:</strong> Total cholesterol and LDL remain slightly elevated. 
                  Recommend continued dietary modifications and consider increasing atorvastatin
                  dosage at next visit if no improvement.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="system-info">
            <Shield size={16} />
            <span>Medical Records System v3.2</span>
          </div>
          <div className="footer-actions">
            <button className="footer-button">
              <FileText size={16} />
              Export Records
            </button>
            <button className="footer-button">
              <MessageSquare size={16} />
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}