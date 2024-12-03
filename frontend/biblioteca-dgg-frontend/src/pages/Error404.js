import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

const NotFound = () => {
    return (
        <>
            <Header />

            <div
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(0px)',
                    position: 'relative',
                    color: 'white',
                    textAlign: 'center',
                    padding: '5rem 0',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1,
                    }}
                ></div>

                <h1
                    style={{
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
    
                    ¡Ups! Hay un Error
                </h1>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light"> 
                <h1 className="display-1 text-danger">404</h1> 
                <h2 className="mb-3 text-secondary">Página no encontrada</h2> 
                <p className="text-muted">Lo sentimos, la página que estás buscando no existe.</p> 
                <Link to="/" className="btn btn-primary mt-3">Volver al inicio</Link>
            </div>

            <Footer />
        </>
    );
};

export default NotFound;
