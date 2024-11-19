import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import escudo from '../images/escudo.png';
const Terms = () => {
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
                    Términos de Servicio
                </h1>
            </div>
            <div className="container col-xxl-8 my-5">
                <h3>En nuestra Biblioteca DGG tenemos también nuestros términos y condiciones</h3>
                <div className="row d-flex align-items-center">
                    <div className="col-md-8">
                        <p><strong>Uso de los Servicios</strong></p>
                        <p className="mt-4">Te comprometes a utilizar nuestros servicios solo para fines legales y de acuerdo con las leyes aplicables.</p>
                    </div>
                    <div className="col-md-4 d-flex justify-content-end">
                        <img src={escudo} alt="foto escudo" style={{ width: 150 }} />
                    </div>
                </div>
                <div className="row d-flex flex-column">
                    <h3>1.Registro de Usuario</h3>
                    <p>Al registrarte, proporcionas información precisa y actualizada. Eres responsable de mantener la confidencialidad de tu cuenta.
                    </p>

                    <p><strong>Modificaciones a los Términos </strong></p>
                    <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios importantes.
                    </p>

                    <p><strong>Limitación de Responsabilidad
                    </strong></p>
                    <p>Biblioteca DGG no será responsable de daños indirectos o consecuentes que surjan del uso de nuestros servicios.</p>


                    <h3>2. Uso Permitido </h3>
                    <p>El acceso y uso de la biblioteca y sus servicios debe ser para fines lícitos y no puede infringir los derechos de propiedad intelectual de la biblioteca o de terceros, ni causar daño, interrupción o sobrecarga en nuestros servicios.</p>
                    <h3>3. Conducta del Usuario</h3>
                    <p>Al utilizar nuestros servicios, te comprometes a no:</p>
                    <p> Involucrarte en actividades fraudulentas o ilegales. </p>
                    <p>Subir o distribuir virus, software malicioso o cualquier otro material dañino.</p>
                    <p>Utilizar el sitio web de manera que interfiera o interrumpa su funcionamiento o el de servidores y redes conectados.</p>
                    <p>Utilizar el servicio para acosar, difamar o amenazar a otros usuarios. </p>
                    <h3>4. Préstamo de Materiales </h3>
                    <p>El préstamo de libros y otros materiales está sujeto a disponibilidad. Los usuarios deben seguir las reglas establecidas por la biblioteca con respecto al período de préstamo, la devolución de materiales y el pago de cualquier cargo asociado con materiales dañados o no devueltos.</p>
                    <p><strong>Responsabilidad por daños: </strong></p>
                    <p>Los usuarios serán responsables de cualquier daño o pérdida de los materiales prestados.</p>

                    <h3>5. Responsabilidad</h3>
                    <p>Biblioteca DGG no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de uso de nuestros servicios, incluyendo la pérdida de datos o interrupciones en los servicios.</p>

                    <h3>6. Contacto</h3>
                    <p>Si tienes alguna pregunta o inquietud acerca de nuestra Política de Privacidad, o si deseas ejercer tus derechos relacionados con la protección de tus datos personales, puedes ponerte en contacto con nosotros a través de la siguiente información:</p>
                    <p><strong>-Correo electrónico: </strong> contacto@bibliotecaDGG.com</p>
                    <p><strong>-Teléfono: </strong>+34 912 345 678 </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Terms;