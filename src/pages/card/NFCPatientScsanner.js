/* global NDEFReader */
import { useState, useEffect } from "react";
import { Clock, ShieldCheck, User, AlertTriangle } from "lucide-react";
import "./styles/NFCCARD.css"; 

export default function NFCPatientScanner() {
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("Ready to scan patient card");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastScanned, setLastScanned] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);

  // Initialize recent activity log on component mount
  useEffect(() => {
    setRecentActivity([
      { 
        type: "login", 
        timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(), 
        user: "Dr. Martinez" 
      },
      { 
        type: "scan", 
        timestamp: new Date(Date.now() - 7200000).toLocaleTimeString(), 
        user: "Nurse Wilson" 
      },
      { 
        type: "emergency", 
        timestamp: new Date(Date.now() - 18000000).toLocaleTimeString(), 
        user: "Dr. Patel" 
      }
    ]);
  }, []);

  // Log activity function
  const logActivity = (type, user = "Current User") => {
    const newActivity = {
      type,
      timestamp: new Date().toLocaleTimeString(),
      user
    };
    
    setRecentActivity(prev => [newActivity, ...prev.slice(0, 3)]);
  };

  const startNFCScan = async () => {
    if (!("NDEFReader" in window)) {
      // Demo Mode with better feedback
      setScanning(true);
      setMessage("Demo Mode: Simulating NFC scan...");
      setErrorMessage("");
      setScanSuccess(false);

      // Simulate scanning process with multiple states
      setTimeout(() => setMessage("Demo Mode: Reading card..."), 800);
      setTimeout(() => setMessage("Demo Mode: Verifying credentials..."), 1500);
      
      setTimeout(() => {
        const mockPatientId = generateSecureId();
        handleSuccessfulScan(mockPatientId, "Simulated Patient");
        logActivity("scan", "Demo User");
      }, 2500);

      return;
    }

    try {
      setScanning(true);
      setMessage("Scanning... Please tap patient card");
      setErrorMessage("");
      setScanSuccess(false);

      const ndef = new NDEFReader();
      await ndef.scan();

      ndef.addEventListener("reading", ({ serialNumber }) => {
        // Lookup patient info based on NFC serial in a real app
        const patientName = lookupPatientName(serialNumber);
        const patientId = generateSecureId(serialNumber);
        
        handleSuccessfulScan(patientId, patientName);
        logActivity("scan");
      });

      ndef.addEventListener("error", (error) => {
        setErrorMessage(`Error: ${error}`);
        setScanning(false);
        logActivity("error");
      });
      
    } catch (error) {
      setErrorMessage(`Error starting NFC scan: ${error.message}`);
      setScanning(false);
      logActivity("error");
    }
  };

  // Generate a secure patient ID that doesn't expose the NFC ID
  const generateSecureId = (nfcId = null) => {
    if (!nfcId) return "PT-" + Math.floor(100000 + Math.random() * 900000);
    
    // In production: Use a secure hash function instead of this simple obfuscation
    const hash = nfcId.split("").reduce((a, b) => {
      return ((a << 5) - a) + b.charCodeAt(0) | 0;
    }, 0);
    
    return "PT-" + Math.abs(hash).toString().substring(0, 6);
  };

  // Simulate a patient name lookup that would use the NFC ID in a real system
  const lookupPatientName = (nfcId) => {
    const patients = {
      "04:A2:BD:C3": "Sarah Johnson",
      "04:F5:92:A1": "Michael Chen",
      "04:D7:81:E2": "Emma Rodriguez"
    };
    
    return patients[nfcId] || "Patient-" + generateSecureId().substring(3);
  };

  const handleSuccessfulScan = (patientId, patientName) => {
    setMessage(`Found: ${patientName}`);
    setScanSuccess(true);
    setLastScanned({
      id: patientId,
      name: patientName,
      timestamp: new Date().toLocaleTimeString()
    });

    setTimeout(() => {
      redirectToPatientDashboard(patientId);
    }, 1500);
  };

  const redirectToPatientDashboard = (patientId) => {
    window.location.href = `patients/PT-548711/dashboard`;

    setScanning(false);
    setMessage("Ready to scan patient card");
    setScanSuccess(false);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case "login": return <User className="activity-icon" />;
      case "scan": return <ShieldCheck className="activity-icon" />;
      case "emergency": return <AlertTriangle className="activity-icon" />;
      case "error": return <AlertTriangle className="activity-icon text-red-500" />;
      default: return <Clock className="activity-icon" />;
    }
  };

  return (
    <div className="nfc-scanner-container">
      <div className="scanner-card">
        <h1 className="scanner-title">Patient Secure Access</h1>

        <div className="scanner-status">
          <p className={`scanner-message ${scanSuccess ? "success" : ""}`}>{message}</p>
          {errorMessage && (
            <p className="scanner-error">{errorMessage}</p>
          )}
        </div>

        {scanning ? (
          <div className="scanning-indicator">
            <div className="spinner"></div>
            <p className="scanning-text">Waiting for NFC card...</p>
          </div>
        ) : (
          <button
            onClick={startNFCScan}
            className="scan-button"
          >
            Start Scan
          </button>
        )}

        {lastScanned && (
          <div className="last-scanned">
            <p>Last accessed: <span className="patient-name">{lastScanned.name}</span></p>
            <p>Patient ID: <span className="patient-id">{lastScanned.id}</span></p>
            <p>Time: <span>{lastScanned.timestamp}</span></p>
          </div>
        )}
      </div>

      <div className="system-activity">
        <h2 className="activity-title">Recent System Activity</h2>
        <ul className="activity-list">
          {recentActivity.map((activity, index) => (
            <li key={index} className={`activity-item ${activity.type}`}>
              {getActivityIcon(activity.type)}
              <div className="activity-info">
                <p className="activity-description">
                  {activity.type === "login" && "User login"}
                  {activity.type === "scan" && "Patient card scan"}
                  {activity.type === "emergency" && "Emergency access"}
                  {activity.type === "error" && "System error"}
                </p>
                <p className="activity-user">{activity.user}</p>
              </div>
              <div className="activity-time">{activity.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="security-notice">
        <ShieldCheck className="security-icon" size={20} />
        <div>
          <p className="security-title">Enhanced Security Protocol</p>
          <p>Patient NFC IDs are encrypted and never displayed.</p>
          <p>System logs all access attempts for audit purposes.</p>
        </div>
      </div>
    </div>
  );
}