import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'; // Importa el contexto de autenticación para el login
import Header from '../components/Header';  // Importa el Header (barra de navegación)
import Footer from '../components/Footer';  // Importa el Footer (pie de página)

function AdminLogin() {
    // Hooks de estado para gestionar los valores del formulario y los errores
    const [email, setEmail] = useState('');  // Email ingresado por el usuario
    const [password, setPassword] = useState('');  // Contraseña ingresada por el usuario
    const [errors, setErrors] = useState({});  // Almacena los errores de validación del formulario

    // Extrae la función 'login' del contexto de autenticación
    const { login } = useContext(AuthContext);

    // Hook para la navegación programática (redirigir a otras rutas)
    const navigate = useNavigate();

    // Función para validar los campos del formulario
    const validateForm = () => {
        const newErrors = {};  // Objeto para almacenar los errores de validación

        // Validación del email
        if (!email) {
            newErrors.email = 'El correo electrónico es requerido'; // Error si no se ingresa un email
        } else if (!/@/.test(email)) {
            newErrors.email = 'El correo electrónico debe contener un @'; // Error si no contiene '@'
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'El correo electrónico no es válido. Debe seguir el formato ejemplo@dominio.com'; // Error si el formato es incorrecto
        }

        // Validación de la contraseña
        if (!password) {
            newErrors.password = 'La contraseña es requerida';  // Error si no se ingresa una contraseña
        }

        setErrors(newErrors);  // Actualiza el estado de los errores
        return Object.keys(newErrors).length === 0;  // Devuelve true si no hay errores
    };

    // Función para manejar el inicio de sesión del administrador
    const handleAdminLogin = async () => {
        // Valida el formulario antes de hacer el login
        if (validateForm()) {
            try {
                // Llama a la función login desde el contexto, pasando el email, contraseña y un parámetro 'true' para indicar que es un login de administrador
                const response = await login(email, password, true);
                if (response && response.status === 'success') {
                    // Si el login es exitoso, redirige al usuario a la página principal
                    navigate('/');
                } else {
                    alert('Error en el inicio de sesión');  // Si hay un error en el login, muestra un mensaje
                }
            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                alert('Error en el inicio de sesión');  // Manejo de error en caso de fallo en la llamada a login
            }
        } else {
            alert('Por favor, corrige los errores en el formulario');  // Muestra un mensaje si hay errores en el formulario
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ background: '#f0f0f0'}}>
            {/* Componente Header que contiene la barra de navegación */}
            <Header />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        {/* Card que contiene el formulario de login */}
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Iniciar sesión como Administrador</h2>
                            <div className="mb-3">
                                {/* Campo de email */}
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Introduce tu correo"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  // Actualiza el estado 'email' cuando el usuario escribe
                                />
                                {errors.email && <div className="text-danger">{errors.email}</div>}  {/* Muestra el error de email si existe */}
                            </div>
                            <div className="mb-3">
                                {/* Campo de contraseña */}
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Introduce tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}  // Actualiza el estado 'password' cuando el usuario escribe
                                />
                                {errors.password && <div className="text-danger">{errors.password}</div>}  {/* Muestra el error de contraseña si existe */}
                            </div>
                            {/* Botón para enviar el formulario */}
                            <button
                                className="btn btn-primary w-100"
                                onClick={handleAdminLogin}  // Llama a la función 'handleAdminLogin' al hacer clic
                            >
                                Ingresar
                            </button>
                            {/* Enlace para redirigir a la página de login de usuario */}
                            <div className="text-center mt-3">
                                <Link to="/login">Iniciar sesión como Usuario cliente</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Componente Footer que contiene el pie de página */}
            <Footer />
        </div>
    );
}

export default AdminLogin;
