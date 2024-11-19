import React, { PureComponent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import escudo from '../images/escudo.png';

const Privacy = () => {
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
                    Politica de Privacidad
                </h1>
            </div>
            <div className="container col-xxl-8 my-5">
                <h3>En nuestra Biblioteca DGG nos importa tu privacidad</h3>
                <div className="row d-flex align-items-center">
                    <div className="col-md-8">
                        <p className="mt-4">En la Biblioteca DGG nos tomamos muy en serio tu privacidad y el tratamiento de tus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos, protegemos y compartimos la información personal que nos proporcionas al acceder y utilizar nuestros servicios a través de nuestro sitio web.</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <img src={escudo} alt="foto escudo" style={{ width: 150 }} />
                    </div>
                </div>
                <div className="row d-flex flex-column">
                    <h3>1. Información que Recopilamos</h3>
                    <p>Recopilamos los siguientes tipos de información:</p>

                    <p><strong>Información Personal Identificable (IPI): </strong></p>
                    <p>Nombre, dirección de correo electrónico, número de teléfono, dirección postal y cualquier otra información proporcionada por los usuarios al registrarse o interactuar con nuestros servicios en línea.</p>

                    <p><strong>Datos de Uso:</strong></p>
                    <p>Información sobre cómo interactúas con nuestro sitio web, incluyendo pero no limitado a direcciones IP, tipo de navegador, páginas visitadas, duración de la visita y otros datos de interacción.</p>

                    <p><strong>Cookies y tecnologías similares: </strong></p>
                    <p>Usamos cookies para mejorar tu experiencia en el sitio web, recordar tus preferencias y realizar análisis de uso. Puedes desactivar las cookies desde tu navegador, pero esto podría afectar el funcionamiento de ciertas funcionalidades del sitio.</p>

                    <h3>2. Cómo Usamos la Información</h3>
                    <p>La información recopilada es utilizada para: </p>

                    <p>-Proporcionar acceso a nuestros servicios (prestamos, consultas de libros, eventos, etc.). </p>
                    <p>-Gestionar tu cuenta de usuario, incluidas las preferencias de notificación y la personalización de contenido. </p>
                    <p>-Mejorar nuestro sitio web y servicios mediante análisis de uso. </p>
                    <p>-Enviar comunicaciones relacionadas con la biblioteca, como boletines, actualizaciones de eventos y promociones (si has optado por recibirlas). </p>
                    <p>-Cumplir con nuestras obligaciones legales y contractuales.</p>
                    <h3>3. Protección de tus Datos Personales</h3>
                    <p>Tomamos medidas razonables para proteger la seguridad de tu información personal. Utilizamos protocolos de seguridad, como cifrado y firewalls, para proteger los datos personales contra el acceso no autorizado, el uso indebido o la divulgación.
                        Sin embargo, debes tener en cuenta que ninguna transmisión de datos por Internet o almacenamiento electrónico es completamente segura, y no podemos garantizar la seguridad absoluta de la información.</p>
                    <h3>4. Compartir tu Información </h3>
                    <p>No vendemos ni alquilamos tu información personal a terceros. No obstante, podemos compartir tu información en los siguientes casos:</p>
                    <p><strong>Proveedores de Servicios:</strong></p>
                    <p>Utilizamos proveedores de servicios de confianza para procesar pagos, enviar correos electrónicos o realizar otras funciones que faciliten el funcionamiento del sitio web. Estos proveedores solo tienen acceso a los datos necesarios para realizar sus servicios y están obligados a mantener la confidencialidad.</p>

                    <p><strong>Cumplimiento Legal:</strong></p>
                    <p>Podemos divulgar tu información si es requerido por la ley o en respuesta a una solicitud válida por parte de una autoridad judicial o administrativa.</p>

                    <h3>5. Tus Derechos sobre la Información Personal </h3>
                    <p>Como usuario, tienes los siguientes derechos sobre tus datos personales:</p>
                    <p><strong>-Acceso: </strong> Puedes solicitar una copia de la información personal que tenemos sobre ti.</p>
                    <p><strong>-Corrección: </strong>Puedes corregir cualquier información personal que esté incorrecta o desactualizada. </p>
                    <p><strong>-Eliminación: </strong> Puedes solicitarnos la eliminación de tus datos personales, salvo que tengamos una razón legítima para conservarlos. </p>
                    <p><strong>-Oposición y Limitación: </strong>Puedes oponerte al procesamiento de tus datos personales o solicitar la limitación de su uso. </p>
                    <p><strong>-Acceso: </strong> Puedes solicitar una copia de la información personal que tenemos sobre ti.</p>
                    <p>Si deseas ejercer cualquiera de estos derechos, por favor contáctanos a través de la sección de contacto de nuestro sitio web.</p>

                    <h3>6. Uso de Cookies</h3>
                    <p>Nuestro sitio web utiliza cookies para mejorar la experiencia de usuario. Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo para recopilar información sobre tus preferencias y hábitos de navegación. Puedes desactivar las cookies en cualquier momento a través de la configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio.</p>

                    <h3>7. Enlaces a Sitios de Terceros</h3>
                    <p>Nuestro sitio web puede contener enlaces a otros sitios web. No somos responsables de las prácticas de privacidad o del contenido de dichos sitios. Te recomendamos revisar sus políticas de privacidad cuando accedas a ellos.</p>
                    <h3>8. Cambios en esta Política de Privacidad</h3>
                    <p>Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será publicado en esta página, indicando la fecha de la última actualización. Te recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos tu información.</p>
                    <h3>9. Contacto</h3>
                    <p>Si tienes alguna pregunta o inquietud acerca de nuestra Política de Privacidad, o si deseas ejercer tus derechos relacionados con la protección de tus datos personales, puedes ponerte en contacto con nosotros a través de la siguiente información:</p>
                    <p><strong>-Correo electrónico: </strong> contacto@bibliotecaDGG.com</p>
                    <p><strong>-Teléfono: </strong>+34 912 345 678 </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Privacy;