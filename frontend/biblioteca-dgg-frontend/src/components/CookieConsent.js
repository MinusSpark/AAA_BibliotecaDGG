import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent bg-dark text-light p-3 d-flex justify-content-between align-items-center" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      <p className="mb-0">Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
      <div>
        <button className="btn btn-primary me-2" onClick={handleAccept}>Aceptar</button>
        <button className="btn btn-secondary" onClick={handleDecline}>Rechazar</button>
      </div>
    </div>
  );
};

export default CookieConsent;

