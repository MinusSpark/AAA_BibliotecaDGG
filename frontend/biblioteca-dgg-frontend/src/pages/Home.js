import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Carousel } from 'react-bootstrap'; // Importamos Carousel de react-bootstrap
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const Home = () => {
    return (
        <div>
            <Header />
            
            {/* Slider de Bootstrap */}
            <Carousel className="my-4">
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400?text=Explora+nuestros+Libros"
                        alt="Primera imagen"
                    />
                    <Carousel.Caption>
                        <h3>Explora Nuestros Libros</h3>
                        <p>Encuentra una gran variedad de títulos y categorías.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400?text=Gestiona+tu+Biblioteca"
                        alt="Segunda imagen"
                    />
                    <Carousel.Caption>
                        <h3>Gestiona tu Biblioteca</h3>
                        <p>Accede a préstamos y devoluciones fácilmente.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/800x400?text=Unete+Hoy+Mismo"
                        alt="Tercera imagen"
                    />
                    <Carousel.Caption>
                        <h3>Únete Hoy Mismo</h3>
                        <p>Regístrate y disfruta de nuestros servicios.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <div className="container text-center my-5">
                <h1 className="display-4">Bienvenido a la Biblioteca DGG</h1>
                <p className="lead">Explora nuestra colección de libros y gestiona tus préstamos.</p>
                <nav>
                    <ul className="list-unstyled">
                        <li className="my-2">
                            <Link className="btn btn-primary" to="/user-panel">Panel de Usuario</Link>
                        </li>
                        <li className="my-2">
                            <Link className="btn btn-secondary" to="/admin-panel">Panel de Administrador</Link>
                        </li>
                        <li className="my-2">
                            <Link className="btn btn-info" to="/contact">Contacto</Link>
                        </li>
                        <li className="my-2">
                            <Link className="btn btn-success" to="/login">Iniciar Sesión</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            
            <Footer />
        </div>
    );
};

export default Home;
