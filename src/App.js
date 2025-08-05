import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import AboutUs from './pages/home/AboutUs'; 
import Services from './pages/home/Services';
import ContactUs from './pages/home/ContactUs';
import HealthRecords from './pages/home/HealthRecords';
import Reviews from './pages/home/Reviews';
import Appointment from './pages/services/Appointment';
import HospitalRegistration from './pages/hospital/HospitalRegistration';
import TelemedicineServices from './pages/services/TelemedicineServices/TelemedicineServices';
import NFCPatientScanner from './pages/card/NFCPatientScsanner';
import PatientDashboard from './pages/patient/PatientDashboard';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientLogin1 from './pages/auth/PatientLogin/PatientLogin';
import HospitalLogin from './pages/auth/HospitalLogin/HospitalLogin';
import DoctorLogin from './pages/auth/DoctorLogin/DoctorLogin';

function App() {
  return (
    <Router>
      <Routes>
        {/* Base Page */}
        <Route path="/" element={<Home/>} />

        {/* Direct Routes */}
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/reviews" element={<Reviews/>}/>
        <Route path="/health-records" element={<HealthRecords/>}/>
        <Route path="/appointment" element={<Appointment/>}/>
        <Route path="/hospital-registration" element={<HospitalRegistration/>}/>
        <Route path="/telemedicine" element={<TelemedicineServices/>}/>
        <Route path="/NFCPatientScanner" element={<NFCPatientScanner/>}/>
        <Route path="/patient-dashboard" element={<PatientDashboard/>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
        <Route path="/patient-login" element={<PatientLogin1 />} />
        <Route path="/hospital-login" element={<HospitalLogin />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        
        {/* Catch-all Route */}
        <Route path="*" element={<Home />} />

      </Routes>
    </Router>
  );
}

export default App;
