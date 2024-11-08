import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'; // para autenticación
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Mi Biblioteca</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/search">Buscar</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contacto</Link>
                            </li>
                            {user ? (
                                <>
                                    {user.role === 'admin' ? (
                                        // Mostrar solo el botón del panel de administrador para admin
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin-panel">Panel de Administrador</Link>
                                        </li>
                                    ) : (
                                        // Mostrar mensaje de bienvenida para usuarios regulares
                                        <li className="nav-item">
                                            <span className="nav-link">Bienvenido, {user.correo}</span>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Registrarse</Link>
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
