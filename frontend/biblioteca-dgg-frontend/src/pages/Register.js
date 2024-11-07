import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
    const [userData, setUserData] = useState({
        dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: ''
    });

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser', userData);
            alert('Registro exitoso');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div>
            <Header />
            <h1>Registro</h1>
            <input type="text" placeholder="DNI" onChange={e => setUserData({ ...userData, dni: e.target.value })} />
            <input type="text" placeholder="Nombre" onChange={e => setUserData({ ...userData, nombre: e.target.value })} />
            <input type="text" placeholder="Apellido" onChange={e => setUserData({ ...userData, apellido: e.target.value })} />
            <input type="text" placeholder="Teléfono" onChange={e => setUserData({ ...userData, telefono: e.target.value })} />
            <input type="email" placeholder="Correo" onChange={e => setUserData({ ...userData, correo: e.target.value })} />
            <input type="password" placeholder="Contraseña" onChange={e => setUserData({ ...userData, password: e.target.value })} />
            <button onClick={handleRegister}>Registrar</button>
            <Footer />
        </div>
    );
}

export default Register;
