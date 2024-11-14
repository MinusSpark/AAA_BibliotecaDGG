// Login.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link
import { AuthContext } from '../services/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login(email, password);
        navigate('/'); // Redirige al inicio tras iniciar sesión
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Iniciar sesión</h2>
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
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                            <div className="text-center mt-3">
                                <Link to="/admin-login">Iniciar sesión como administrador</Link> {/* Enlace a administrador */}
                            </div>
                            <div className="text-center mt-3">
                                <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p> {/* Enlace a Registro */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
