import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'; // para autenticación
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-dark text-white">
            <nav className="navbar navbar-expand-lg " style={{background: '#002B5B'}}>
                <div className="container">
                    <Link className="navbar-brand "style={{color:'#FFC300'}} to="/">Biblioteca DGG</Link> {/* Aseguramos texto blanco */}
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
                        <span className="navbar-toggler-icon" style={{backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")"}}></span>
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
                                            <Link to="/user-panel" className="nav-link text-white">Bienvenido/a, {user.correo}</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-outline-light" onClick={handleLogout}>Cerrar sesión</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/register">Registrarse</Link>
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
