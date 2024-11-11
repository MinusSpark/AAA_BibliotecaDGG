import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Política de Privacidad</h2>
                            <p>
                                En Biblioteca DGG, valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
                            </p>
                            <h4>Información que Recopilamos</h4>
                            <p>
                                Recopilamos información que nos proporcionas al registrarte, como tu nombre, correo electrónico y número de teléfono.
                            </p>
                            <h4>Uso de la Información</h4>
                            <p>
                                Utilizamos tu información para mejorar nuestros servicios y comunicarnos contigo sobre tus préstamos y novedades.
                            </p>
                            <h4>Protección de Datos</h4>
                            <p>
                                Implementamos medidas de seguridad para proteger tu información personal contra accesos no autorizados.
                            </p>
                            <h4>Cambios a esta Política</h4>
                            <p>
                                Nos reservamos el derecho de modificar esta política en cualquier momento. Te notificaremos sobre cambios significativos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;
