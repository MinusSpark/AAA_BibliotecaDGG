import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ apiKey, location }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            if (mapRef.current && window.google) {
                new window.google.maps.Map(mapRef.current, {
                    center: location,
                    zoom: 15,
                });
            }
        };

        // Asegurarse de que `initMap` esté disponible globalmente
        window.initMap = initMap;

        // Verificar si el script de Google Maps ya está presente en el documento
        const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
        } else {
            initMap(); // Si el script ya está presente, simplemente inicializa el mapa
        }

        // Cleanup al desmontar el componente
        return () => {
            window.initMap = undefined; // Limpiar la función global cuando el componente se desmonte
        };
    }, [apiKey, location]);

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default GoogleMap;
