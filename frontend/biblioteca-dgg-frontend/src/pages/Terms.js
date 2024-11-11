import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Términos de Servicio</h2>
                            <p>
                                Bienvenido a Biblioteca DGG. Al utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones.
                            </p>
                            <h4>Uso de los Servicios</h4>
                            <p>
                                Te comprometes a utilizar nuestros servicios solo para fines legales y de acuerdo con las leyes aplicables.
                            </p>
                            <h4>Registro de Usuario</h4>
                            <p>
                                Al registrarte, proporcionas información precisa y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta.
                            </p>
                            <h4>Modificaciones a los Términos</h4>
                            <p>
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes.
                            </p>
                            <h4>Limitación de Responsabilidad</h4>
                            <p>
                                Biblioteca DGG no será responsable de daños indirectos o consecuentes que surjan del uso de nuestros servicios.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Terms;
