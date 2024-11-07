import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPanel = () => {
    return (
        <div>
            <Header />
            <h1>Panel de Usuario</h1>
            <p>Gestiona tus préstamos y notificaciones desde aquí.</p>
            <Footer />
        </div>
    );
};

export default UserPanel;
