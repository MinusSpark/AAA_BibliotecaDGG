import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CookieConsent = () => {
  // Estado que controla la visibilidad del mensaje de consentimiento
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verifica si ya se ha dado consentimiento en el almacenamiento local (localStorage)
    const consent = localStorage.getItem('cookieConsent');

    // Si no hay consentimiento guardado, muestra el mensaje de consentimiento
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  // Maneja el caso en que el usuario acepta el uso de cookies
  const handleAccept = () => {
    // Guarda en localStorage que el usuario aceptó el uso de cookies
    localStorage.setItem('cookieConsent', 'accepted');

    // Oculta el mensaje de consentimiento
    setShowConsent(false);
  };

  // Maneja el caso en que el usuario rechaza el uso de cookies
  const handleDecline = () => {
    // Guarda en localStorage que el usuario rechazó el uso de cookies
    localStorage.setItem('cookieConsent', 'declined');

    // Oculta el mensaje de consentimiento
    setShowConsent(false);
  };

  // Si no se debe mostrar el mensaje de consentimiento, no renderiza nada
  if (!showConsent) return null;

  return (
    <div className="cookie-consent bg-dark text-light p-3 d-flex justify-content-between align-items-center"
      style={{ position: 'fixed', bottom: 0, width: '100%' }}>
      {/* Mensaje de consentimiento */}
      <p className="mb-0">Usamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?</p>
      <div>
        {/* Botón para aceptar el uso de cookies */}
        <button className="btn btn-primary me-2" onClick={handleAccept}>Aceptar</button>
        {/* Botón para rechazar el uso de cookies */}
        <button className="btn btn-secondary" onClick={handleDecline}>Rechazar</button>
      </div>
    </div>
  );
};

export default CookieConsent;
