import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminPanel = () => {
    return (
        <div>
            <Header />
            <h1>Panel de Administrador</h1>
            <p>Gestiona usuarios, inventario de libros y más desde aquí.</p>
            <Footer />
        </div>
    );
};

export default AdminPanel;
