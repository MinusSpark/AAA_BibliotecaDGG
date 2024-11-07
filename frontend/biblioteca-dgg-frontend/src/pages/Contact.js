import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Contact() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Contáctanos</h2>
                            <p className="text-center">Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Introduce tu nombre"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Introduce tu correo"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Mensaje</label>
                                    <textarea
                                        className="form-control"
                                        id="message"
                                        rows="4"
                                        placeholder="Escribe tu mensaje aquí"
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Enviar</button>
                            </form>
                            <div className="mt-4 text-center">
                                <p>Email: <a href="mailto:contacto@bibliotecaDGG.com">contacto@bibliotecaDGG.com</a></p>
                                <p>Teléfono: +34 912 345 678</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
