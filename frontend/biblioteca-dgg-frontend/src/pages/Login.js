import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://localhost:3001/api/login', { email, password })
            .then(response => alert('Login exitoso'))
            .catch(error => console.error('Error en login:', error));
    };

    return (
        <div>
            <Header />
            <h1>Iniciar sesión</h1>
            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Ingresar</button>
            <Footer />
        </div>
    );
}

export default Login;
