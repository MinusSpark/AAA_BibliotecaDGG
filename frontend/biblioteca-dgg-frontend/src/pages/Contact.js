import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleMap from '../components/GoogleMap';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import Home from './Home.js';
import ReCAPTCHA from 'react-google-recaptcha';

function Contact() {
    const form = useRef();
    const recaptchaRef = useRef();
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!form.current.from_name.value) {
            newErrors.from_name = 'El nombre es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(form.current.from_name.value)) {
            newErrors.from_name = 'El nombre debe contener solo letras y espacios';
        }

        if (!form.current.user_email.value) {
            newErrors.user_email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(form.current.user_email.value)) {
            newErrors.user_email = 'El correo electrónico no es válido';
        }

        if (!form.current.message.value) {
            newErrors.message = 'El mensaje es requerido';
        } else if (form.current.message.value.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (!captchaValue) {
            alert('Por favor, verifica el captcha');
            return;
        }

        if (validateForm()) {
            emailjs.sendForm('service_ymdwg5n', 'template_8f8utqp', form.current, 'U5ZLx6-OA1gLEW6kq')
                .then((result) => {
                    console.log(result.text);
                    alert('Mensaje enviado con éxito');
                    recaptchaRef.current.reset();
                    setCaptchaValue(null);
                }, (error) => {
                    console.log(error.text);
                    alert('Error al enviar el mensaje');
                });
        } else {
            alert('Por favor, corrige los errores en el formulario');
        }
    };

    const onCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
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
                Contacto
              </h1>
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
                            {errors.from_name && <div className="text-danger">{errors.from_name}</div>}
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
                            {errors.user_email && <div className="text-danger">{errors.user_email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mensaje</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="4"
                                placeholder="Escribe brevemente lo que quieres saber"
                            ></textarea>
                            {errors.message && <div className="text-danger">{errors.message}</div>}
                        </div>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdchowqAAAAAMCvrkK_Q9J6f7gt-RVThvTMMkRC"
                            onChange={onCaptchaChange}
                        />
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
