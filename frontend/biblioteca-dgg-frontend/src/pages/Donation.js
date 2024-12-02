import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import manos from '../images/manosAyudar.png';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Modal, Button } from 'react-bootstrap'; // Importar componentes de Bootstrap

const Donacion = () => {
    // Estado para mostrar u ocultar el recibo tras una donación exitosa
    const [showReceipt, setShowReceipt] = useState(false);
    // Estado para almacenar los datos del recibo (nombre, correo, monto, comprobante)
    const [receiptData, setReceiptData] = useState(null);

    // Función para manejar la aprobación de la donación
    const handleApprove = (data, actions) => {
        // Captura la orden de la donación una vez que el pago ha sido aprobado
        return actions.order.capture().then((details) => {
            // Extrae la información del pagador (nombre, correo) y monto de la donación
            const { payer } = details;
            const nombre = `${payer.name.given_name} ${payer.name.surname}`; // Nombre completo del pagador
            const correo = payer.email_address; // Correo del pagador
            const monto = details.purchase_units[0].amount.value; // Monto de la donación
            const mensaje = "Gracias por tu donación!"; // Mensaje de agradecimiento
            const comprobante = details.id; // ID de la transacción como comprobante

            // Enviar los datos de la donación al backend para su registro
            fetch("http://localhost/AAA_BibliotecaDGG/backend/api.php?request=createDonation", {
                method: "POST",  // Usamos el método POST para enviar los datos
                headers: { "Content-Type": "application/json" }, // Especificamos que el cuerpo es un JSON
                body: JSON.stringify({ nombre, correo, monto, mensaje, comprobante }), // Cuerpo de la solicitud con los datos de la donación
            })
                .then((response) => response.json())  // Parseamos la respuesta del backend como JSON
                .then((data) => {
                    // Si el backend responde con un estado de éxito, mostramos el recibo
                    if (data.status === "success") {
                        setReceiptData({ nombre, correo, monto, comprobante }); // Guardamos los datos del recibo
                        setShowReceipt(true); // Cambiamos el estado para mostrar el recibo
                    } else {
                        alert("Error al registrar la donación."); // Si ocurre un error en el backend, mostramos un alerta
                    }
                })
                .catch((error) => console.error("Error:", error)); // Si hay un error en la comunicación con el backend, lo mostramos en la consola
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

            <div className="container text-center my-5">
                <div className="row d-flex align-items-center">
                    <div className="col-md-6 escrito">
                        <h4 className="mb-4">¡Ayúdanos a llevar libros donde más se necesitan!</h4>
                        <p>La DANA ha dejado su huella en Valencia, afectando gravemente a numerosos colegios que ahora carecen de los recursos necesarios para seguir ofreciendo educación de calidad a sus estudiantes.
                            Queremos cambiar eso, y tú puedes ser parte de esta misión.</p>
                        <p>Con tu donación de tan solo 10 euros, contribuiremos a la compra de libros para que estos colegios puedan reconstruir sus bibliotecas y brindar a los niños la oportunidad de seguir aprendiendo y soñando</p>
                        <p>Cada aportación cuenta. Juntos podemos marcar la diferencia en la vida de cientos de estudiantes que dependen de nuestra ayuda para mirar hacia un futuro mejor.</p>
                        <p>"Un libro es un puente hacia la esperanza."</p>
                    </div>
                    <div className="col-md-6 zonaDePago d-flex flex-column">
                        <div className="imagen">
                            <img src={manos} className="w-50 mb-5" alt="manosAyudar" />
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
                                fundingSource="paypal"
                            />
                        </PayPalScriptProvider>
                    </div>
                </div>
            </div>

            {/* Modal de recibo de donación */}
            <Modal show={showReceipt} onHide={() => setShowReceipt(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Recibo de Donación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Nombre: {receiptData?.nombre}</p>
                    <p>Correo: {receiptData?.correo}</p>
                    <p>Monto: {receiptData?.monto}€</p>
                    <p>Comprobante: {receiptData?.comprobante}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReceipt(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
};

export default Donacion;