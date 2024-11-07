// AdminLogin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAdminLogin = async () => {
        try {
            const response = await login(email, password, true); // Llama a la función de login
            if (response && response.status === 'success') {
                navigate('/'); // Redirige al inicio tras iniciar sesión
            } else {
                alert('Error en el inicio de sesión'); // Manejo de error
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error en el inicio de sesión'); // Manejo de error
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Iniciar sesión como Administrador</h2>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Introduce tu correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Introduce tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleAdminLogin}
                            >
                                Ingresar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminLogin;
