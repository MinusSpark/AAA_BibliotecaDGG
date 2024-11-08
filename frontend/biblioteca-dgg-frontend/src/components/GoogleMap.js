import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ apiKey, location }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initMap = () => {
            if (mapRef.current) {
                new window.google.maps.Map(mapRef.current, {
                    center: location,
                    zoom: 15,
                });
            }
        };

        if (!window.google) {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onload = () => window.initMap = initMap;
        } else {
            initMap();
        }
    }, [apiKey, location]);

    return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
};

export default GoogleMap;
