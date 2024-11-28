import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link
import { AuthContext } from '../services/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/@/.test(email)) {
            newErrors.email = 'El correo electrónico debe contener un @';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo electrónico no es válido. Debe seguir el formato ejemplo@dominio.com';
        }

        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (validateForm()) {
            await login(email, password);
            navigate('/'); // Redirige al inicio tras iniciar sesión
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-5">
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
                                {errors.email && <div className="text-danger">{errors.email}</div>}
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
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                            <div className="text-center mt-3">
                                <Link to="/admin-login">Iniciar sesión como administrador</Link>
                            </div>
                            <div className="text-center mt-3">
                                <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
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
