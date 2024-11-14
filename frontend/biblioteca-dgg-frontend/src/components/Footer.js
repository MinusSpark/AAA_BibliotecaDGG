import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Envelope, Telephone } from 'react-bootstrap-icons'; // Importamos los iconos de Bootstrap

function Footer() {
    return (
        <footer className="bg-dark text-white py-4 mt-auto">
            <div className="container text-center">
                <div className="row justify-content-center">
                    {/* Sección izquierda: Nombre de la Biblioteca */}
                    <div className="col-md-4 mb-3">
                        <h2 className="h4">Biblioteca DGG</h2>
                    </div>

                    {/* Sección central: Menú de Navegación */}
                    <div className="col-md-4 mb-3">
                        <h5>Menú</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-white text-decoration-none">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/libros" className="text-white text-decoration-none">Libros</Link>
                            </li>
                            <li>
                                <Link to="/servicios" className="text-white text-decoration-none">Servicios</Link>
                            </li>
                            <li>
                                <Link to="/contacto" className="text-white text-decoration-none">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Sección derecha: Datos de contacto */}
                    <div className="col-md-4 mb-3">
                        <h5>Contacto</h5>
                        <div>
                            <p>
                                <Envelope size={20} className="me-2" />
                                <a href="mailto:contacto@bibliotecaDGG.com" className="text-white text-decoration-none">contacto@bibliotecaDGG.com</a>
                            </p>
                            <p>
                                <Telephone size={20} className="me-2" />
                                <a href="tel:+34912345678" className="text-white text-decoration-none">+34 912 345 678</a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Enlaces de Políticas */}
                <div className="row text-center mt-4">
                    <div className="col">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <Link to="/privacy" className="text-white text-decoration-none">Política de Privacidad</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/terms" className="text-white text-decoration-none">Términos de Servicio</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
