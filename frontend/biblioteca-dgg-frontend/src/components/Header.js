import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'; // para autenticación
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importar iconos de Bootstrap
import '../App.css';

function Header() {
    // Extraemos el usuario y la función de logout del contexto de autenticación
    const { user, logout } = useContext(AuthContext);

    // Hook de navegación para redirigir al usuario
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Llama a la función de logout del contexto
        logout();
        // Redirige al usuario a la página principal
        navigate('/');
    };

    return (
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg" style={{ background: '#002B5B' }}>
                <div className="container">
                    {/* Enlace a la página principal */}
                    <Link className="navbar-brand" style={{ color: '#FFC300' }} to="/">Biblioteca DGG</Link>
                    {/* Botón para menú en móviles */}
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                        <span className="navbar-toggler-icon" style={{ backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")" }}></span>
                    </button>
                    {/* Menú de navegación */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Enlaces del menú */}
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">
                                    <i className="bi bi-house me-2"></i>Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/search">
                                    <i className="bi bi-search me-2"></i>Buscar
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">
                                    <i className="bi bi-envelope me-2"></i>Contacto
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/donacion">
                                    <i className="bi bi-gift me-2"></i>Donaciones
                                </Link>
                            </li>
                            {/* Condicional: si el usuario está autenticado */}
                            {user ? (
                                <>
                                    {/* Si el usuario es un administrador, mostramos el enlace al panel de administración */}
                                    {user.role === 'admin' ? (
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/admin-panel">
                                                <i className="bi bi-shield-lock me-2"></i>Panel de Administrador
                                            </Link>
                                        </li>
                                    ) : (
                                        // Si el usuario es un usuario regular, mostramos su correo y un enlace a su panel
                                        <li className="nav-item">
                                            <Link to="/user-panel" className="nav-link text-white">
                                                <i className="bi bi-person-circle me-2"></i>Bienvenido/a, {user.correo}
                                            </Link>
                                        </li>
                                    )}
                                    {/* Botón para cerrar sesión */}
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right me-2"></i>Cerrar sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                // Si el usuario no está autenticado, mostramos los enlaces para login y registro
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login">
                                            <i className="bi bi-box-arrow-in-right me-2"></i>Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/register">
                                            <i className="bi bi-person-plus me-2"></i>Registrarse
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
