import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import manos from '../images/manosAyudar.png';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Donacion = () => {
    const handleApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const { payer } = details;
            const nombre = `${payer.name.given_name} ${payer.name.surname}`;
            const correo = payer.email_address;
            const monto = details.purchase_units[0].amount.value;
            const mensaje = "Gracias por tu donación!"; // Mensaje fijo o variable si prefieres
            const comprobante = details.id;

            // Enviar los datos al backend
            fetch("http://localhost/AAA_BibliotecaDGG/backend/api.php?request=createDonation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre, correo, monto, mensaje, comprobante }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === "success") {
                        alert("¡Gracias por tu donación! Comprobante: " + comprobante);
                    } else {
                        alert("Error al registrar la donación.");
                    }
                })
                .catch((error) => console.error("Error:", error));
        });
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
                    Donación para la DANA
                </h1>
                <p style={{ position: 'relative', zIndex: 2, marginTop: '20px' }}>
                    Ayuda a los afectados por la DANA con tu contribución de 10€. ¡Tu apoyo puede marcar la diferencia!
                </p>
            </div>

            <div class="container text-center my-5">
                <div class="row d-flex align-items-center">
                    <div class="col-md-6 escrito" >
                        <h4 class="mb-4">¡Ayúdanos a llevar libros donde más se necesitan!</h4>
                        <p>La DANA ha dejado su huella en Valencia, afectando gravemente a numerosos colegios que ahora carecen de los recursos necesarios para seguir ofreciendo educación de calidad a sus estudiantes.
                            Queremos cambiar eso, y tú puedes ser parte de esta misión.</p>

                        <p>Con tu donación de tan solo 10 euros, contribuiremos a la compra de libros para que estos colegios puedan reconstruir sus bibliotecas y brindar a los niños la oportunidad de seguir aprendiendo y soñando</p>
                        <p>Cada aportación cuenta. Juntos podemos marcar la diferencia en la vida de cientos de estudiantes que dependen de nuestra ayuda para mirar hacia un futuro mejor.</p>
                        <p>"Un libro es un puente hacia la esperanza."</p>

                    </div>
                    <div class="col-md-6 zonaDePago d-flex flex-column">

                        <div class="imagen">
                            <img src={manos} class="w-50 mb-5" alt="manosAyudar" />
                        </div>


                        <PayPalScriptProvider options={{ "client-id": "AbA4bNp5WeicyKUXcZJh0iGAQER4TMUIA3pNNjLHLU7UXRckNyjuVsyNS2RPixexbP9lPLM73EXqk2hs" }}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: { value: "10.00" },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={handleApprove}
                                onError={(err) => {
                                    console.error("Error en PayPal:", err);
                                    alert("Hubo un error al procesar tu donación.");
                                }}
                                fundingSource="paypal"  // Asegura que solo PayPal esté habilitado
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Donacion;