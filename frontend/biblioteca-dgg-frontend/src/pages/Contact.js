import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleMap from '../components/GoogleMap';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import ReCAPTCHA from 'react-google-recaptcha';

function Contact() {
    // Referencias para acceder a los elementos del formulario y del reCAPTCHA
    const form = useRef();
    const recaptchaRef = useRef();

    // Estado para manejar el valor del captcha y los errores del formulario
    const [captchaValue, setCaptchaValue] = useState(null);
    const [errors, setErrors] = useState({});

    // Función de validación de formulario
    const validateForm = () => {
        const newErrors = {};  // Objeto para almacenar los errores de validación

        // Validación del nombre
        if (!form.current.from_name.value) {
            newErrors.from_name = 'El nombre es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(form.current.from_name.value)) {
            newErrors.from_name = 'El nombre debe contener solo letras y espacios';
        }

        // Validación del correo electrónico
        if (!form.current.user_email.value) {
            newErrors.user_email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(form.current.user_email.value)) {
            newErrors.user_email = 'El correo electrónico no es válido';
        }

        // Validación del mensaje
        if (!form.current.message.value) {
            newErrors.message = 'El mensaje es requerido';
        } else if (form.current.message.value.length < 10) {
            newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
        }

        setErrors(newErrors);  // Actualiza el estado de los errores
        return Object.keys(newErrors).length === 0;  // Devuelve true si no hay errores
    };

    // Función para enviar el correo electrónico utilizando emailjs
    const sendEmail = (e) => {
        e.preventDefault();  // Previene el comportamiento por defecto del formulario (recarga de página)

        // Verifica si el reCAPTCHA fue completado
        if (!captchaValue) {
            alert('Por favor, verifica el captcha');
            return;
        }

        // Si el formulario es válido, se procede a enviar el correo
        if (validateForm()) {
            // Utiliza emailjs para enviar el formulario
            emailjs.sendForm('service_ymdwg5n', 'template_8f8utqp', form.current, 'U5ZLx6-OA1gLEW6kq')
                .then((result) => {
                    console.log(result.text);
                    alert('Mensaje enviado con éxito');  // Notifica al usuario que el mensaje se envió con éxito
                    recaptchaRef.current.reset();  // Resetea el reCAPTCHA
                    setCaptchaValue(null);  // Reinicia el valor del captcha
                }, (error) => {
                    console.log(error.text);
                    alert('Error al enviar el mensaje');  // Si ocurre un error al enviar el mensaje, se notifica al usuario
                });
        } else {
            alert('Por favor, corrige los errores en el formulario');  // Si hay errores de validación, se solicita al usuario que los corrija
        }
    };

    // Función para manejar el cambio de valor en el reCAPTCHA
    const onCaptchaChange = (value) => {
        setCaptchaValue(value);  // Actualiza el valor del captcha cuando el usuario lo completa
    };

    return (
        <div className="d-flex flex-column min-vh-100" style={{ background: '#f0f0f0' }}>
            <Header />

            <div
                className="position-relative text-center text-white py-5"
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }}
                ></div>
                <h1 className="position-relative z-2 display-4">Contacto</h1>
            </div>

            <div className="container my-5">
                <div className="row g-4">
                    {/* Columna para el mapa */}
                    <div className="col-12 col-lg-6">
                        <div className="card shadow-lg h-100">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Nuestra Ubicación</h2>
                                <div style={{ height: '600px' }}>
                                    {/* Muestra el componente GoogleMap con las coordenadas de la ubicación */}
                                    <GoogleMap
                                        apiKey="AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik"
                                        location={{ lat: 40.5829314, lng: -4.0141457 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna para el formulario */}
                    <div className="col-12 col-lg-6">
                        <div className="card shadow-lg h-100">
                            <div className="card-body">
                                <h2 className="text-center mb-4">Contáctanos</h2>
                                <p className="text-center">
                                    Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.
                                </p>
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

                                    <button type="submit" className="btn btn-primary w-100 mt-3">Enviar</button>
                                </form>

                                <div className="mt-4 text-center">
                                    <p>Email: <a href="mailto:bibliotecadgg@outlook.com">contacto@bibliotecaDGG.com</a></p>
                                    <p>Teléfono: +34 912 345 678</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Componente Footer que contiene el pie de página */}
            <Footer />
        </div>
    );

}

export default Contact;