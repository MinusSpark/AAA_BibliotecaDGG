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
        <div className="d-flex flex-column min-vh-100">
            {/* Componente Header que contiene la barra de navegación */}
            <Header />

            {/* Sección de fondo con imagen y estilo */}
            <div
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,  // Establece la imagen de fondo
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(0px)',  // Sin filtro de desenfoque
                    position: 'relative',
                    color: 'white',
                    textAlign: 'center',
                    padding: '5rem 0',  // Padding para darle espacio a la sección
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Filtro oscuro para mejorar la legibilidad del texto
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
                {/* Card para mostrar la ubicación en el mapa de Google */}
                <div className="card shadow-lg p-4 mb-4">
                    <h2 className="text-center mb-4">Nuestra Ubicación</h2>
                    <div style={{ height: '550px', width: '100%' }}>
                        {/* Muestra el componente GoogleMap con las coordenadas de la ubicación */}
                        <GoogleMap apiKey="AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik" location={{ lat: 40.5829314, lng: -4.0141457 }} />
                    </div>
                </div>

                {/* Card para mostrar el formulario de contacto */}
                <div className="card shadow-lg p-4 mb-4">
                    <h2 className="text-center mb-4">Contáctanos</h2>
                    <p className="text-center">Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.</p>
                    {/* Formulario de contacto */}
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
                            {/* Muestra los errores de validación del nombre */}
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
                            {/* Muestra los errores de validación del correo */}
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
                            {/* Muestra los errores de validación del mensaje */}
                            {errors.message && <div className="text-danger">{errors.message}</div>}
                        </div>

                        {/* Componente reCAPTCHA para verificar que el usuario no es un robot */}
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LdchowqAAAAAMCvrkK_Q9J6f7gt-RVThvTMMkRC"  // Clave del sitio para reCAPTCHA
                            onChange={onCaptchaChange}  // Actualiza el valor del captcha
                        />

                        {/* Botón de envío del formulario */}
                        <button type="submit" className="btn btn-primary w-100" to="/">Enviar</button>
                    </form>

                    {/* Información adicional de contacto */}
                    <div className="mt-4 text-center">
                        <p>Email: <a href="mailto:bibliotecadgg@outlook.com">contacto@bibliotecaDGG.com</a></p>
                        <p>Teléfono: +34 912 345 678</p>
                    </div>
                </div>
            </div>

            {/* Componente Footer que contiene el pie de página */}
            <Footer />
        </div>
    );
}

export default Contact;