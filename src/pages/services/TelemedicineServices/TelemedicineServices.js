import React from 'react';
import './styles/TelemedicineServices.css'; // Import CSS styles for the component

function TelemedicineServices() {
  // Set minimum date for appointment booking to current date
  const [today, setToday] = React.useState('');
  
  React.useEffect(() => {
    // Set today's date in YYYY-MM-DD format for the date input min
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for booking an appointment! We will send a confirmation email shortly with the details and instructions for your telemedicine consultation.');
    e.target.reset();
  };

  // Scroll to booking form
  const scrollToBooking = () => {
    document.querySelector('.telemedicine-booking-container').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return React.createElement('div', { className: 'telemedicine-section' }, [
    React.createElement('h1', { className: 'telemedicine-title', key: 'title' }, 'Telemedicine Services'),
    
    React.createElement('div', { className: 'telemedicine-container', key: 'container' }, [
      // Hero Section
      React.createElement('div', { className: 'telemedicine-hero', key: 'hero' }, [
        React.createElement('h2', { key: 'hero-title' }, 'Virtual Healthcare at Your Fingertips'),
        React.createElement('p', { key: 'hero-description' }, 'Access quality healthcare services anytime, anywhere. Our telemedicine platform connects you with experienced doctors through secure video consultations, providing convenient and effective healthcare solutions without leaving your home.'),
        React.createElement('button', { 
          className: 'telemedicine-btn', 
          onClick: scrollToBooking,
          key: 'hero-button'
        }, 'Book Your Consultation')
      ]),
      
      // Services Section
      React.createElement('div', { key: 'services-section' }, [
        React.createElement('h2', { className: 'telemedicine-section-title', key: 'services-title' }, 'Our Telemedicine Services'),
        React.createElement('div', { className: 'telemedicine-services', key: 'services-cards' }, [
          React.createElement('div', { className: 'telemedicine-service-card', key: 'service-1' }, [
            React.createElement('div', { className: 'telemedicine-service-icon', key: 'service-1-icon' }, '👨‍⚕️'),
            React.createElement('h3', { className: 'telemedicine-service-title', key: 'service-1-title' }, 'Virtual Consultations'),
            React.createElement('p', { key: 'service-1-desc' }, 'Connect with qualified doctors through high-quality video calls for diagnosis, treatment plans, and medical advice from the comfort of your home.')
          ]),
          React.createElement('div', { className: 'telemedicine-service-card', key: 'service-2' }, [
            React.createElement('div', { className: 'telemedicine-service-icon', key: 'service-2-icon' }, '💊'),
            React.createElement('h3', { className: 'telemedicine-service-title', key: 'service-2-title' }, 'E-Prescriptions'),
            React.createElement('p', { key: 'service-2-desc' }, 'Receive digital prescriptions after your consultation that can be used at your preferred pharmacy or delivered directly to your doorstep.')
          ]),
          React.createElement('div', { className: 'telemedicine-service-card', key: 'service-3' }, [
            React.createElement('div', { className: 'telemedicine-service-icon', key: 'service-3-icon' }, '📋'),
            React.createElement('h3', { className: 'telemedicine-service-title', key: 'service-3-title' }, 'Digital Health Records'),
            React.createElement('p', { key: 'service-3-desc' }, 'Access your medical history, test results, and treatment plans in one secure location, making it easier to manage your healthcare journey.')
          ])
        ])
      ]),
      
      // Video Consultation Section
      React.createElement('div', { className: 'telemedicine-video-consultation', key: 'video-section' }, [
        React.createElement('h2', { className: 'telemedicine-section-title', key: 'video-title' }, 'The Video Consultation Experience'),
        React.createElement('p', { key: 'video-description' }, 'Our telemedicine platform provides a seamless virtual consultation experience that closely resembles an in-person doctor visit, all from the comfort of your home.'),
        
        React.createElement('div', { className: 'telemedicine-video-steps', key: 'video-steps' }, [
          React.createElement('div', { className: 'telemedicine-video-step', key: 'video-step-1' }, [
            React.createElement('div', { className: 'telemedicine-video-step-icon', key: 'video-step-1-icon' }, '1'),
            React.createElement('div', { className: 'telemedicine-video-step-content', key: 'video-step-1-content' }, [
              React.createElement('h4', { key: 'video-step-1-title' }, 'Preparing for Your Call'),
              React.createElement('p', { key: 'video-step-1-desc' }, 'Find a quiet, well-lit private space. Have your symptoms list, current medications, and any medical records ready. Test your device\'s camera and microphone beforehand.')
            ])
          ]),
          React.createElement('div', { className: 'telemedicine-video-step', key: 'video-step-2' }, [
            React.createElement('div', { className: 'telemedicine-video-step-icon', key: 'video-step-2-icon' }, '2'),
            React.createElement('div', { className: 'telemedicine-video-step-content', key: 'video-step-2-content' }, [
              React.createElement('h4', { key: 'video-step-2-title' }, 'During the Consultation'),
              React.createElement('p', { key: 'video-step-2-desc' }, 'Your doctor will review your history, discuss your symptoms, and may ask you to perform simple physical demonstrations when relevant. Feel free to ask questions just as you would in person.')
            ])
          ]),
          React.createElement('div', { className: 'telemedicine-video-step', key: 'video-step-3' }, [
            React.createElement('div', { className: 'telemedicine-video-step-icon', key: 'video-step-3-icon' }, '3'),
            React.createElement('div', { className: 'telemedicine-video-step-content', key: 'video-step-3-content' }, [
              React.createElement('h4', { key: 'video-step-3-title' }, 'After Your Visit'),
              React.createElement('p', { key: 'video-step-3-desc' }, 'You\'ll receive a summary of your consultation, including diagnosis, treatment plan, prescriptions, and follow-up instructions through your secure patient portal.')
            ])
          ])
        ])
      ]),
      
      // How It Works Section
      React.createElement('div', { className: 'telemedicine-how-it-works', key: 'how-it-works' }, [
        React.createElement('h2', { 
          style: { textAlign: 'center', marginBottom: '1.5rem' }, 
          key: 'how-it-works-title' 
        }, 'How Our Telemedicine Process Works'),
        
        React.createElement('div', { className: 'telemedicine-steps', key: 'how-it-works-steps' }, [
          React.createElement('div', { className: 'telemedicine-step', key: 'step-1' }, [
            React.createElement('div', { className: 'telemedicine-step-number', key: 'step-1-number' }, '1'),
            React.createElement('h3', { key: 'step-1-title' }, 'Register'),
            React.createElement('p', { key: 'step-1-desc' }, 'Create your personal account with basic information and relevant medical history to get started.')
          ]),
          React.createElement('div', { className: 'telemedicine-step', key: 'step-2' }, [
            React.createElement('div', { className: 'telemedicine-step-number', key: 'step-2-number' }, '2'),
            React.createElement('h3', { key: 'step-2-title' }, 'Book Appointment'),
            React.createElement('p', { key: 'step-2-desc' }, 'Choose from our list of specialists and select a date and time that works best for your schedule.')
          ]),
          React.createElement('div', { className: 'telemedicine-step', key: 'step-3' }, [
            React.createElement('div', { className: 'telemedicine-step-number', key: 'step-3-number' }, '3'),
            React.createElement('h3', { key: 'step-3-title' }, 'Video Consultation'),
            React.createElement('p', { key: 'step-3-desc' }, 'Connect with your doctor through our secure, HD-quality video platform for personalized care.')
          ]),
          React.createElement('div', { className: 'telemedicine-step', key: 'step-4' }, [
            React.createElement('div', { className: 'telemedicine-step-number', key: 'step-4-number' }, '4'),
            React.createElement('h3', { key: 'step-4-title' }, 'Treatment & Follow-up'),
            React.createElement('p', { key: 'step-4-desc' }, 'Receive your treatment plan, prescriptions, and schedule any needed follow-up appointments.')
          ])
        ])
      ]),
      
      // Specialties Section
      React.createElement('div', { className: 'telemedicine-specialties', key: 'specialties' }, [
        React.createElement('h2', { className: 'telemedicine-section-title', key: 'specialties-title' }, 'Available Medical Specialties'),
        React.createElement('p', { key: 'specialties-desc' }, 'Our telemedicine platform connects you with board-certified specialists across numerous medical fields, ensuring you receive expert care for your specific health needs.'),
        
        React.createElement('div', { className: 'telemedicine-specialty-grid', key: 'specialty-grid' }, [
          createSpecialtyItem('👨‍⚕️', 'General Medicine', 'specialty-1'),
          createSpecialtyItem('❤️', 'Cardiology', 'specialty-2'),
          createSpecialtyItem('🧠', 'Neurology', 'specialty-3'),
          createSpecialtyItem('👶', 'Pediatrics', 'specialty-4'),
          createSpecialtyItem('🦴', 'Orthopedics', 'specialty-5'),
          createSpecialtyItem('🧘', 'Psychiatry', 'specialty-6'),
          createSpecialtyItem('👁️', 'Ophthalmology', 'specialty-7'),
          createSpecialtyItem('🦷', 'Dental Consultation', 'specialty-8'),
          createSpecialtyItem('🤰', 'Obstetrics & Gynecology', 'specialty-9'),
          createSpecialtyItem('🧪', 'Endocrinology', 'specialty-10'),
          createSpecialtyItem('🦻', 'ENT Specialist', 'specialty-11'),
          createSpecialtyItem('🔬', 'Dermatology', 'specialty-12')
        ])
      ]),
      
      // Booking Container
      React.createElement('div', { className: 'telemedicine-booking-container', key: 'booking-container' }, [
        // Booking Info
        React.createElement('div', { className: 'telemedicine-booking-info', key: 'booking-info' }, [
          React.createElement('h3', { key: 'booking-info-title' }, 'Why Book Online?'),
          React.createElement('ul', { key: 'booking-info-list' }, [
            React.createElement('li', { key: 'benefit-1' }, 'No travel or waiting rooms - save time and reduce exposure to illness'),
            React.createElement('li', { key: 'benefit-2' }, 'Flexible scheduling - including evenings and weekends'),
            React.createElement('li', { key: 'benefit-3' }, 'Access to specialists regardless of your location'),
            React.createElement('li', { key: 'benefit-4' }, 'Same quality care as in-person visits for many conditions'),
            React.createElement('li', { key: 'benefit-5' }, 'Digital prescriptions sent directly to your preferred pharmacy'),
            React.createElement('li', { key: 'benefit-6' }, 'Secure and confidential consultations'),
            React.createElement('li', { key: 'benefit-7' }, 'Easy follow-up appointments and continuous care')
          ])
        ]),
        
        // Booking Form
        React.createElement('div', { className: 'telemedicine-booking-form', key: 'booking-form' }, [
          React.createElement('h3', { 
            style: { color: '#138808', marginBottom: '1.5rem' }, 
            key: 'booking-form-title' 
          }, 'Book Your Appointment'),
          
          React.createElement('form', { 
            id: 'telemedicine-appointment-form', 
            onSubmit: handleFormSubmit,
            key: 'appointment-form'
          }, [
            createFormGroup('Full Name', 'text', 'patient-name', true, 'form-group-1'),
            createFormGroup('Email Address', 'email', 'patient-email', true, 'form-group-2'),
            createFormGroup('Phone Number', 'tel', 'patient-phone', true, 'form-group-3'),
            
            React.createElement('div', { className: 'telemedicine-form-group', key: 'form-group-4' }, [
              React.createElement('label', { htmlFor: 'specialty', key: 'specialty-label' }, 'Select Specialty'),
              React.createElement('select', { 
                id: 'specialty', 
                name: 'specialty', 
                required: true, 
                key: 'specialty-select' 
              }, [
                React.createElement('option', { value: '', key: 'select-option' }, 'Choose a specialty'),
                React.createElement('option', { value: 'general', key: 'general-option' }, 'General Medicine'),
                React.createElement('option', { value: 'cardiology', key: 'cardiology-option' }, 'Cardiology'),
                React.createElement('option', { value: 'neurology', key: 'neurology-option' }, 'Neurology'),
                React.createElement('option', { value: 'pediatrics', key: 'pediatrics-option' }, 'Pediatrics'),
                React.createElement('option', { value: 'orthopedics', key: 'orthopedics-option' }, 'Orthopedics'),
                React.createElement('option', { value: 'psychiatry', key: 'psychiatry-option' }, 'Psychiatry'),
                React.createElement('option', { value: 'ophthalmology', key: 'ophthalmology-option' }, 'Ophthalmology'),
                React.createElement('option', { value: 'dental', key: 'dental-option' }, 'Dental Consultation'),
                React.createElement('option', { value: 'gynecology', key: 'gynecology-option' }, 'Obstetrics & Gynecology'),
                React.createElement('option', { value: 'endocrinology', key: 'endocrinology-option' }, 'Endocrinology'),
                React.createElement('option', { value: 'ent', key: 'ent-option' }, 'ENT Specialist'),
                React.createElement('option', { value: 'dermatology', key: 'dermatology-option' }, 'Dermatology')
              ])
            ]),
            
            React.createElement('div', { className: 'telemedicine-form-group', key: 'form-group-5' }, [
              React.createElement('label', { htmlFor: 'appointment-date', key: 'date-label' }, 'Preferred Date'),
              React.createElement('input', { 
                type: 'date', 
                id: 'appointment-date', 
                name: 'appointment-date', 
                min: today,
                required: true, 
                key: 'date-input' 
              })
            ]),
            
            React.createElement('div', { className: 'telemedicine-form-group', key: 'form-group-6' }, [
              React.createElement('label', { htmlFor: 'appointment-time', key: 'time-label' }, 'Preferred Time'),
              React.createElement('select', { 
                id: 'appointment-time', 
                name: 'appointment-time', 
                required: true, 
                key: 'time-select' 
              }, [
                React.createElement('option', { value: '', key: 'time-option' }, 'Select a time slot'),
                React.createElement('option', { value: 'morning', key: 'morning-option' }, 'Morning (9AM - 12PM)'),
                React.createElement('option', { value: 'afternoon', key: 'afternoon-option' }, 'Afternoon (12PM - 4PM)'),
                React.createElement('option', { value: 'evening', key: 'evening-option' }, 'Evening (4PM - 8PM)')
              ])
            ]),
            
            React.createElement('button', { 
              type: 'submit', 
              className: 'telemedicine-btn', 
              style: { width: '100%', marginTop: '1rem', backgroundColor: '#138808' },
              key: 'submit-button'
            }, 'Schedule Consultation')
          ])
        ])
      ]),
      
      // CTA Section
      React.createElement('div', { className: 'telemedicine-cta', key: 'cta-section' }, [
        React.createElement('h2', { key: 'cta-title' }, 'Experience Healthcare Redefined'),
        React.createElement('p', { key: 'cta-description' }, 'Join thousands of patients who have discovered the convenience, accessibility, and effectiveness of telemedicine consultations. Our platform ensures you receive quality healthcare without the hassle of travel or waiting rooms.'),
        React.createElement('button', { 
          className: 'telemedicine-btn', 
          style: { backgroundColor: '#138808' },
          key: 'learn-more-btn'
        }, 'Learn More About Telemedicine'),
        
        React.createElement('div', { className: 'telemedicine-testimonials', key: 'testimonials' }, [
          React.createElement('div', { className: 'telemedicine-testimonial', key: 'testimonial-1' }, [
            React.createElement('p', { key: 'testimonial-text' }, 'I was skeptical about online consultations, but my experience was fantastic! The doctor was thorough, attentive, and helped resolve my issue without me having to leave home. Highly recommended!'),
            React.createElement('div', { className: 'telemedicine-testimonial-author', key: 'testimonial-author' }, '- Rahul M.')
          ])
        ])
      ])
    ])
  ]);
  
  // Helper function to create specialty items
  function createSpecialtyItem(icon, name, key) {
    return React.createElement('div', { className: 'telemedicine-specialty-item', key: key }, [
      React.createElement('span', { className: 'telemedicine-specialty-icon', key: `${key}-icon` }, icon),
      React.createElement('span', { className: 'telemedicine-specialty-name', key: `${key}-name` }, name)
    ]);
  }
  
  // Helper function to create form groups
  function createFormGroup(label, type, id, required, key) {
    return React.createElement('div', { className: 'telemedicine-form-group', key: key }, [
      React.createElement('label', { htmlFor: id, key: `${key}-label` }, label),
      React.createElement('input', { 
        type: type, 
        id: id, 
        name: id, 
        required: required, 
        key: `${key}-input` 
      })
    ]);
  }
}

export default TelemedicineServices;