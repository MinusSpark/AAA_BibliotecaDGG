import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'; // para autenticación
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg " style={{background: '#002B5B'}}>
                <div className="container">
                    <Link className="navbar-brand "style={{color:'#FFC300'}} to="/">Biblioteca DGG</Link> {/* Aseguramos texto blanco */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/">Home</Link> {/* Texto blanco */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/search">Buscar</Link> {/* Texto blanco */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/contact">Contacto</Link> {/* Texto blanco */}
                            </li>
                            {user ? (
                                <>
                                    {user.role === 'admin' ? (
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/admin-panel">Panel de Administrador</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <span className="nav-link text-white">Bienvenido, {user.correo}</span>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" onClick={logout}>Cerrar sesión</button> {/* Botón con borde blanco */}
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login">Login</Link> {/* Texto blanco */}
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/register">Registrarse</Link> {/* Texto blanco */}
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
