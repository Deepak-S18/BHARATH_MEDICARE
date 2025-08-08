import { useState, useEffect, useRef, useCallback } from "react";
import { Scan, Camera, CheckCircle, AlertCircle, Shield, RotateCcw, Monitor } from "lucide-react";
import "./styles/BARCODECARD.css";

export default function SimpleBarcodeScanner() {
  // Core scanning states
  const [scanMode, setScanMode] = useState("hardware");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("Ready to scan patient barcode");
  const [error, setError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  
  // Camera specific states
  const [currentCamera, setCurrentCamera] = useState("environment");
  const [availableCameras, setAvailableCameras] = useState([]);
  
  // Patient data states
  const [currentPatient, setCurrentPatient] = useState(null);
  
  // Hardware scanner states
  const [barcodeBuffer, setBarcodeBuffer] = useState("");
  const barcodeTimeoutRef = useRef(null);
  const lastKeypressTimeRef = useRef(0);
  const scannerActiveRef = useRef(false);
  
  // Camera and detection refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const codeReaderRef = useRef(null);

  // Scanner configuration
  const SCANNER_TIMEOUT = 100;
  const MIN_BARCODE_LENGTH = 3;
  const MAX_BARCODE_LENGTH = 50;

  // Load ZXing library for camera scanning
  useEffect(() => {
    const loadZXing = async () => {
      try {
        if (!window.ZXing) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@zxing/library@latest/umd/index.min.js';
          script.onload = () => {
            console.log('ZXing library loaded successfully');
          };
          script.onerror = () => {
            console.error('Failed to load ZXing library');
          };
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading ZXing library:', error);
      }
    };

    loadZXing();
  }, []);

  // Get available cameras
  useEffect(() => {
    const getCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(cameras);
      } catch (error) {
        console.error('Error getting cameras:', error);
      }
    };

    if (scanMode === "camera") {
      getCameras();
    }
  }, [scanMode]);

  // Hash barcode value for security
  const hashBarcodeValue = useCallback((value) => {
    const hash = value.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return `***${Math.abs(hash).toString().slice(-4)}`;
  }, []);

  // Validate and lookup patient information
  const validateAndLookupPatient = useCallback(async (barcodeValue) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const patientDatabase = {
      "MED2024001": { id: "PT-847291", name: "Emily Johnson", dob: "1985-03-15", ward: "ICU-A", bloodType: "O+", allergies: "None" },
      "MED2024002": { id: "PT-692647", name: "Michael Brown", dob: "1978-07-22", ward: "General-B", bloodType: "A-", allergies: "Penicillin" },
      "MED2024003": { id: "PT-539162", name: "Sarah Davis", dob: "1992-11-08", ward: "Emergency", bloodType: "B+", allergies: "Latex" },
      "MED2024004": { id: "PT-748395", name: "David Wilson", dob: "1965-09-30", ward: "Cardiology", bloodType: "AB+", allergies: "None" },
      "MED2024005": { id: "PT-386217", name: "Lisa Anderson", dob: "1988-05-17", ward: "Orthopedics", bloodType: "O-", allergies: "Aspirin" },
      "123456789": { id: "PT-123456", name: "Test Patient", dob: "1990-01-01", ward: "Test Ward", bloodType: "A+", allergies: "None" },
      "987654321": { id: "PT-987654", name: "Demo Patient", dob: "1995-05-15", ward: "Demo Ward", bloodType: "B-", allergies: "Shellfish" },
      "PATIENT001": { id: "PT-001001", name: "John Smith", dob: "1988-03-12", ward: "General", bloodType: "A+", allergies: "None" },
      "PATIENT002": { id: "PT-002002", name: "Jane Doe", dob: "1992-07-25", ward: "Cardiology", bloodType: "O+", allergies: "Peanuts" }
    };
    
    const patient = patientDatabase[barcodeValue];
    
    if (patient) {
      return {
        ...patient,
        lastAccessed: new Date().toISOString(),
        accessLevel: "authorized"
      };
    }
    
    return null;
  }, []);

  // Process detected barcode
  const processBarcodeResult = useCallback(async (barcodeValue) => {
    try {
      setScanStatus("Verifying patient barcode...");
      setError(null);
      
      if (barcodeValue.length < MIN_BARCODE_LENGTH || barcodeValue.length > MAX_BARCODE_LENGTH) {
        setError("Unable to detect valid barcode format");
        setScanStatus("Scan failed - Invalid barcode");
        
        setTimeout(() => {
          setError(null);
          setScanStatus("Ready to scan patient barcode");
        }, 3000);
        return;
      }

      const patientData = await validateAndLookupPatient(barcodeValue);
      
      if (patientData) {
        setCurrentPatient(patientData);
        setScanStatus(`Patient found: ${patientData.name}`);
        setError(null);
        
        // Auto-redirect to PatientDashboard page after 2 seconds
        setTimeout(() => {
          redirectToPatientDashboard();
        }, 2000);
        
      } else {
        setError("Unable to detect patient - Barcode not recognized");
        setScanStatus("Scan failed - Patient not found");
        setCurrentPatient(null);
        
        setTimeout(() => {
          setError(null);
          setScanStatus("Ready to scan patient barcode");
        }, 3000);
      }
      
    } catch (err) {
      console.error("Barcode processing error:", err);
      setError("Unable to detect barcode - Processing failed");
      setScanStatus("Scan failed - Please try again");
      setCurrentPatient(null);
      
      setTimeout(() => {
        setError(null);
        setScanStatus("Ready to scan patient barcode");
      }, 3000);
    }
  }, [validateAndLookupPatient]);

  // Hardware scanner input handler
  const handleBarcodeInput = useCallback((barcode) => {
    if (barcode && barcode.trim().length >= MIN_BARCODE_LENGTH) {
      processBarcodeResult(barcode.trim());
    }
  }, [processBarcodeResult]);

  // Hardware scanner keyboard handler
  const handleKeyPress = useCallback((event) => {
    if (!isScanning || scanMode !== "hardware") return;

    const currentTime = Date.now();
    const timeDiff = currentTime - lastKeypressTimeRef.current;
    
    if (barcodeTimeoutRef.current) {
      clearTimeout(barcodeTimeoutRef.current);
    }

    if (timeDiff > SCANNER_TIMEOUT && barcodeBuffer.length > 0) {
      setBarcodeBuffer("");
    }

    lastKeypressTimeRef.current = currentTime;

    if (event.key === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      if (barcodeBuffer.length >= MIN_BARCODE_LENGTH) {
        handleBarcodeInput(barcodeBuffer);
        setBarcodeBuffer("");
      }
      return;
    }

    if (event.key === 'Tab' || event.keyCode === 9) {
      event.preventDefault();
      if (barcodeBuffer.length >= MIN_BARCODE_LENGTH) {
        handleBarcodeInput(barcodeBuffer);
        setBarcodeBuffer("");
      }
      return;
    }

    if (event.key.length === 1) {
      const newBuffer = barcodeBuffer + event.key;
      setBarcodeBuffer(newBuffer);
      
      barcodeTimeoutRef.current = setTimeout(() => {
        if (newBuffer.length >= MIN_BARCODE_LENGTH) {
          handleBarcodeInput(newBuffer);
          setBarcodeBuffer("");
        }
      }, SCANNER_TIMEOUT);
      
      if (!scannerActiveRef.current) {
        scannerActiveRef.current = true;
        setScanStatus("Scanning barcode...");
        setTimeout(() => {
          scannerActiveRef.current = false;
        }, 500);
      }
    }
  }, [isScanning, scanMode, barcodeBuffer, handleBarcodeInput]);

  // Camera scanning functions with proper null checks
  const startCameraScanning = useCallback(async () => {
    try {
      setError(null);
      setScanStatus("Starting camera...");
      setIsScanning(true);

      if (!window.ZXing) {
        throw new Error("Camera scanner not available. Please refresh the page.");
      }

      const constraints = {
        video: {
          facingMode: currentCamera,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // **FIXED: Added proper null checks here**
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Add error handling for the video element
        videoRef.current.onloadedmetadata = () => {
          // **CRITICAL FIX: Check if videoRef.current still exists before calling play**
          if (videoRef.current && streamRef.current) {
            videoRef.current.play()
              .then(() => {
                // **ADDITIONAL CHECK: Ensure component is still mounted and scanning**
                if (isScanning && videoRef.current) {
                  setCameraReady(true);
                  setScanStatus("Point camera at barcode");
                  startCameraScanLoop();
                }
              })
              .catch(err => {
                console.error("Video play error:", err);
                handleScanError("Unable to start camera preview");
              });
          }
        };

        // Add error handler for video loading
        videoRef.current.onerror = (err) => {
          console.error("Video loading error:", err);
          handleScanError("Unable to load camera stream");
        };
      }

    } catch (err) {
      console.error("Camera access error:", err);
      handleScanError("Unable to access camera");
    }
  }, [currentCamera, isScanning]);

  // Camera scan loop with null checks
  const startCameraScanLoop = useCallback(() => {
    // **FIXED: Added comprehensive null checks**
    if (!videoRef.current || !window.ZXing || !isScanning) return;

    try {
      const { BrowserMultiFormatReader } = window.ZXing;
      codeReaderRef.current = new BrowserMultiFormatReader();
      
      codeReaderRef.current.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
        if (result && isScanning) {
          processBarcodeResult(result.getText());
        }
        if (error && error.name !== 'NotFoundException') {
          console.error('Camera decode error:', error);
        }
      });
      
    } catch (error) {
      console.error('Error starting camera scan loop:', error);
      handleScanError("Unable to detect barcodes with camera");
    }
  }, [processBarcodeResult, isScanning]);

  // Switch camera with improved error handling
  const switchCamera = useCallback(async () => {
    if (!isScanning || scanMode !== "camera") return;
    
    const newCamera = currentCamera === "environment" ? "user" : "environment";
    setCurrentCamera(newCamera);
    
    // Stop current stream
    stopScanning();
    
    // Start with new camera after a brief delay
    setTimeout(() => {
      if (scanMode === "camera") { // Additional check
        startCameraScanning();
      }
    }, 500);
  }, [isScanning, scanMode, currentCamera, startCameraScanning]);

  // Handle scanning errors
  const handleScanError = useCallback((message) => {
    setError(message);
    setScanStatus("Scan failed - Please try again");
    setIsScanning(false);
    setCameraReady(false);
  }, []);

  // Start scanning based on mode
  const startScanning = useCallback(() => {
    setCurrentPatient(null);
    
    if (scanMode === "hardware") {
      setIsScanning(true);
      setScanStatus("Ready - Scan patient barcode");
      setError(null);
      setBarcodeBuffer("");
      window.focus();
    } else {
      startCameraScanning();
    }
  }, [scanMode, startCameraScanning]);

  // Stop scanning with comprehensive cleanup
  const stopScanning = useCallback(() => {
    setIsScanning(false);
    setCameraReady(false);
    setScanStatus("Ready to scan patient barcode");
    setBarcodeBuffer("");
    scannerActiveRef.current = false;
    
    if (barcodeTimeoutRef.current) {
      clearTimeout(barcodeTimeoutRef.current);
      barcodeTimeoutRef.current = null;
    }

    if (codeReaderRef.current) {
      try {
        codeReaderRef.current.reset();
      } catch (error) {
        console.warn('Error resetting code reader:', error);
      }
      codeReaderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (error) {
          console.warn('Error stopping track:', error);
        }
      });
      streamRef.current = null;
    }

    // **FIXED: Additional null check before clearing video source**
    if (videoRef.current) {
      try {
        videoRef.current.srcObject = null;
        videoRef.current.onloadedmetadata = null;
        videoRef.current.onerror = null;
      } catch (error) {
        console.warn('Error clearing video element:', error);
      }
    }
  }, []);

  // Redirect to PatientDashboard page
  const redirectToPatientDashboard = useCallback(() => {
    window.location.href = "/patient-dashboard";
  }, []);

  // Keyboard event listeners for hardware scanner
  useEffect(() => {
    if (isScanning && scanMode === "hardware") {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keypress', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [isScanning, scanMode, handleKeyPress]);

  // Cleanup on unmount with improved error handling
  useEffect(() => {
    return () => {
      try {
        if (barcodeTimeoutRef.current) {
          clearTimeout(barcodeTimeoutRef.current);
        }
        stopScanning();
      } catch (error) {
        console.warn('Error during cleanup:', error);
      }
    };
  }, [stopScanning]);

  return (
    <div className="simple-barcode-scanner">
      {/* Main Scanner Interface */}
      <div className="scanner-interface">
        <div className="scanner-header">
          <h1 className="scanner-title">
            <Shield className="title-icon" />
            Patient Barcode Scanner
          </h1>
          
          {/* Mode Selection */}
          <div className="mode-selection">
            <button
              onClick={() => {
                if (isScanning) stopScanning();
                setScanMode("hardware");
                setCurrentPatient(null);
              }}
              className={`mode-button ${scanMode === "hardware" ? "active" : ""}`}
            >
              <Monitor size={18} />
              2D Scanner
            </button>
            <button
              onClick={() => {
                if (isScanning) stopScanning();
                setScanMode("camera");
                setCurrentPatient(null);
              }}
              className={`mode-button ${scanMode === "camera" ? "active" : ""}`}
            >
              <Camera size={18} />
              Camera
            </button>
          </div>

          <div className="scanner-status">
            <p className={`status-message ${error ? 'error' : ''} ${currentPatient ? 'success' : ''}`}>
              {error || scanStatus}
            </p>
          </div>
        </div>

        {/* Scanner Interface */}
        <div className="scanner-interface-area">
          {scanMode === "hardware" ? (
            // Hardware Scanner Interface
            isScanning ? (
              <div className="scanner-active">
                <div className="scanner-visual">
                  <Scan className="scanner-icon" size={80} />
                  <div className="scanner-animation">
                    <div className="pulse-ring"></div>
                    <div className="pulse-ring delay-1"></div>
                    <div className="pulse-ring delay-2"></div>
                  </div>
                </div>
                <div className="scanner-instructions">
                  <h3>Scanner Active</h3>
                  <p>Scan patient barcode with your 2D scanner</p>
                  {barcodeBuffer && (
                    <div className="barcode-buffer">
                      <span>Reading: {barcodeBuffer.length} characters</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="scanner-prompt">
                <Scan className="prompt-icon" size={60} />
                <h3>2D Barcode Scanner</h3>
                <p>Connect your hardware scanner and click to start</p>
              </div>
            )
          ) : (
            // Camera Scanner Interface
            isScanning ? (
              <div className="camera-container">
                <video
                  ref={videoRef}
                  className="camera-feed"
                  autoPlay
                  muted
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  className="detection-canvas"
                  style={{ display: 'none' }}
                />
                
                {cameraReady && (
                  <div className="scan-overlay">
                    <div className="scan-frame">
                      <div className="scan-corners">
                        <div className="corner top-left"></div>
                        <div className="corner top-right"></div>
                        <div className="corner bottom-left"></div>
                        <div className="corner bottom-right"></div>
                      </div>
                      <div className="scan-line"></div>
                    </div>
                    <div className="scan-instructions">
                      Position barcode within the frame
                    </div>
                  </div>
                )}

                {/* Camera Switch Button */}
                {cameraReady && availableCameras.length > 1 && (
                  <button
                    onClick={switchCamera}
                    className="camera-switch-button"
                    title="Switch Camera"
                  >
                    <RotateCcw size={20} />
                    <span>{currentCamera === 'environment' ? 'Front' : 'Back'}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="scanner-prompt">
                <Camera className="prompt-icon" size={60} />
                <h3>Camera Scanner</h3>
                <p>Use device camera to scan barcodes</p>
                <div className="camera-info">
                  <span>Using: {currentCamera === 'environment' ? 'Back Camera' : 'Front Camera'}</span>
                </div>
              </div>
            )
          )}
        </div>

        {/* Control Buttons */}
        <div className="scanner-controls">
          {!isScanning ? (
            <button 
              onClick={startScanning}
              className="primary-button start-scan"
            >
              {scanMode === "hardware" ? <Scan size={20} /> : <Camera size={20} />}
              Start {scanMode === "hardware" ? "2D Scanner" : "Camera"}
            </button>
          ) : (
            <button 
              onClick={stopScanning}
              className="secondary-button stop-scan"
            >
              <AlertCircle size={20} />
              Stop Scanning
            </button>
          )}
        </div>

        {/* Patient Details Display */}
        {currentPatient && (
          <div className="patient-details-card">
            <div className="patient-header">
              <CheckCircle className="success-icon" size={24} />
              <h2>Patient Details</h2>
            </div>
            
            <div className="patient-grid">
              <div className="patient-field">
                <label>Patient Name</label>
                <span className="patient-value">{currentPatient.name}</span>
              </div>
              
              <div className="patient-field">
                <label>Patient ID</label>
                <span className="patient-value">{currentPatient.id}</span>
              </div>
              
              <div className="patient-field">
                <label>Date of Birth</label>
                <span className="patient-value">{new Date(currentPatient.dob).toLocaleDateString()}</span>
              </div>
              
              <div className="patient-field">
                <label>Ward</label>
                <span className="patient-value">{currentPatient.ward}</span>
              </div>
              
              <div className="patient-field">
                <label>Blood Type</label>
                <span className="patient-value blood-type">{currentPatient.bloodType}</span>
              </div>
              
              <div className="patient-field">
                <label>Allergies</label>
                <span className={`patient-value ${currentPatient.allergies === 'None' ? 'no-allergies' : 'has-allergies'}`}>
                  {currentPatient.allergies}
                </span>
              </div>
            </div>
            
            <div className="redirect-notice">
              <p>Redirecting to patient dashboard in 2 seconds...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
