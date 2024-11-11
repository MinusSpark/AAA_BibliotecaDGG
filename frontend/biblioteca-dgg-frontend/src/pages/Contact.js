import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleMap from '../components/GoogleMap'; // Asegúrate de importar correctamente

function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ymdwg5n', 'template_8f8utqp', form.current, 'U5ZLx6-OA1gLEW6kq')
            .then((result) => {
                console.log(result.text);
                alert('Mensaje enviado con éxito');
            }, (error) => {
                console.log(error.text);
                alert('Error al enviar el mensaje');
            });
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <div className="container-fluid" style={{background: '#808080', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '9em', marginBottom:'3em', boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                <h1 style={{color:'white'}}>Contacto</h1>
            </div>

            <div className="container my-auto">
                <div className="card shadow-lg p-4 mb-4">
                    <h2 className="text-center mb-4">Nuestra Ubicación</h2>
                    <div style={{ height: '550px', width: '100%' }}>
                        <GoogleMap apiKey="AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik" location={{ lat: 40.5829314, lng: -4.0141457 }} />
                    </div>
                </div>
                <div className="card shadow-lg p-4 mb-4">
                    <h2 className="text-center mb-4">Contáctanos</h2>
                    <p className="text-center">Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="mb-3">
                            <label htmlFor="from_name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="from_name"
                                name="from_name"
                                placeholder="Introduce tu nombre"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user_email" className="form-label">Correo electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="user_email"
                                name="user_email"
                                placeholder="Introduce tu correo"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Escribe tu mensaje aquí"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100" to="/">Enviar</button>
                    </form>
                    <div className="mt-4 text-center">
                        <p>Email: <a href="mailto:bibliotecadgg@outlook.com">contacto@bibliotecaDGG.com</a></p>
                        <p>Teléfono: +34 912 345 678</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
