import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Envelope, Telephone } from 'react-bootstrap-icons'; // Importamos los iconos de Bootstrap

function Footer() {
    return (
        <footer className="text-white py-4 mt-auto" style={{background: '#002B5B'}}>
            <div className="container">
                <div className="row justify-content-center">
                    {/* Sección izquierda: Nombre de la Biblioteca */}
                    <div className="col-12 col-md-4 mb-3 col-xxl-3 text-xxl-start text-center">
                    <Link className="navbar-brand "style={{color:'#FFC300',fontSize:20}} to="/">Biblioteca DGG</Link> {/* Aseguramos texto blanco */}
                        <p>Un Mundo de Conocimiento a tu Alcance</p>
                    </div>

                    {/* Sección central: Menú de Navegación */}
                    <div className="col-12 col-md-4 mb-3 col-xxl-2 text-xxl-start text-center">
                        <h5 style={{color:'#FFC300'}}>Menú</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link to="/" className="text-white text-decoration-none">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/search" className="text-white text-decoration-none">Libros</Link>
                            </li>
                            <li>
                                <Link to="/donation" className="text-white text-decoration-none">Donar</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-white text-decoration-none">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Sección derecha: Datos de contacto */}
                    <div className="col-12 col-md-4 mb-3 col-xxl-3 text-xxl-start text-center">
                        <h5 style={{color:'#FFC300'}}>Contacto</h5>
                        <div>
                            <p>
                                <Envelope size={20} className="me-2" style={{color:'#FFC300'}} />
                                <a href="mailto:contacto@bibliotecaDGG.com" className="text-white text-decoration-none">contacto@bibliotecaDGG.com</a>
                            </p>
                            <p>
                                <Telephone size={20} className="me-2" style={{color:'#FFC300'}} />
                                <a href="tel:+34912345678" className="text-white text-decoration-none">+34 912 345 678</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
              {/* Enlaces de Políticas */}
              <div className="container-fluid col-12 bg-dark text-center mt-4" style={{ minHeight: '80px', marginBottom:-30, paddingTop:20 }}>
                    <div className="col">
                        <ul className="list-inline">
                            <li className="list-inline-item ">
                                <Link to="/privacy" className="text-white text-decoration-none">Política de Privacidad |</Link>
                            </li>
                            <li className="list-inline-item">
                                <Link to="/terms" className="text-white text-decoration-none">Términos de Servicio</Link>
                            </li>
                        </ul>
                    </div>
                </div>
        </footer>
    );
}

export default Footer;