import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importar Link
import { AuthContext } from '../services/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    // Estados locales para manejar los datos del formulario y los errores
    const [email, setEmail] = useState('');  // Estado para el correo electrónico
    const [password, setPassword] = useState('');  // Estado para la contraseña
    const [errors, setErrors] = useState({});  // Estado para almacenar los errores de validación

    const { login } = useContext(AuthContext);  // Obtener la función de login desde el contexto
    const navigate = useNavigate();  // Hook para navegar entre páginas

    // Función para validar los campos del formulario
    const validateForm = () => {
        const newErrors = {};  // Objeto para almacenar los errores de validación

        // Validación del correo electrónico
        if (!email) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/@/.test(email)) {
            newErrors.email = 'El correo electrónico debe contener un @';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo electrónico no es válido. Debe seguir el formato ejemplo@dominio.com';
        }

        // Validación de la contraseña
        if (!password) {
            newErrors.password = 'La contraseña es requerida';
        }

        setErrors(newErrors);  // Actualiza el estado de los errores
        return Object.keys(newErrors).length === 0;  // Retorna true si no hay errores
    };

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        if (validateForm()) {  // Solo si el formulario es válido
            await login(email, password);  // Llama a la función de login del contexto
            navigate('/');  // Redirige a la página principal tras iniciar sesión
        } else {
            alert('Por favor, corrige los errores en el formulario');  // Muestra un mensaje si el formulario tiene errores
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
                                    onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado del email
                                />
                                {/* Muestra un mensaje de error si el email es inválido */}
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
                                    onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado de la contraseña
                                />
                                {/* Muestra un mensaje de error si la contraseña está vacía */}
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            {/* Botón para enviar el formulario e iniciar sesión */}
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleLogin}
                            >
                                Ingresar
                            </button>
                            <div className="text-center mt-3">
                                {/* Enlace para iniciar sesión como administrador */}
                                <Link to="/admin-login">Iniciar sesión como administrador</Link>
                            </div>
                            <div className="text-center mt-3">
                                {/* Enlace para redirigir a la página de registro */}
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
