import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button } from 'react-bootstrap';

function Register() {
    // Estados locales para almacenar los datos del formulario, errores y el estado de visibilidad
    const [userData, setUserData] = useState({
        dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: ''
    });  // Estado para almacenar la información del usuario que se va a registrar

    const [errors, setErrors] = useState({});  // Estado para almacenar los errores de validación
    const [show, setShow] = useState(false);  // Estado para controlar la visibilidad de algún componente (por ejemplo, un modal)
    const navigate = useNavigate();  // Hook de navegación para redirigir al usuario después del registro

    // Funciones para controlar la visibilidad de un componente, como un modal
    const handleClose = () => setShow(false);  // Cierra el modal
    const handleShow = () => setShow(true);    // Abre el modal

    // Función para validar el formulario antes de enviarlo al backend
    const validateForm = () => {
        const newErrors = {};  // Objeto para almacenar los errores de validación

        // Validación del DNI (debe tener 8 números seguidos de una letra mayúscula)
        if (!userData.dni) {
            newErrors.dni = 'El DNI es requerido';
        } else if (!/^\d{8}[A-Z]$/.test(userData.dni)) {
            newErrors.dni = 'El DNI debe tener 8 números y una letra mayúscula';
        }

        // Validación del nombre (debe ser solo letras y espacios)
        if (!userData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(userData.nombre)) {
            newErrors.nombre = 'El nombre debe contener solo letras y espacios';
        }

        // Validación del apellido (debe ser solo letras y espacios)
        if (!userData.apellido) {
            newErrors.apellido = 'El apellido es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(userData.apellido)) {
            newErrors.apellido = 'El apellido debe contener solo letras y espacios';
        }

        // Validación del teléfono (debe tener exactamente 9 dígitos)
        if (!userData.telefono) {
            newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^\d{9}$/.test(userData.telefono)) {
            newErrors.telefono = 'El teléfono debe contener 9 dígitos';
        }

        // Validación del correo electrónico (debe seguir el formato correcto)
        if (!userData.correo) {
            newErrors.correo = 'El correo electrónico es requerido';
        } else if (!/@/.test(userData.correo)) {
            newErrors.correo = 'El correo electrónico debe contener un @';
        } else if (!/\S+@\S+\.\S+/.test(userData.correo)) {
            newErrors.correo = 'El correo electrónico no es válido. Debe seguir el formato ejemplo@dominio.com';
        }

        // Validación de la contraseña (mínimo 8 caracteres, máximo 9, con al menos un número y la primera letra mayúscula)
        if (!userData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (userData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (userData.password.length > 9) {
            newErrors.password = 'La contraseña no debe tener más de 9 caracteres';
        } else if (!/[A-Z]/.test(userData.password.charAt(0))) {
            newErrors.password = 'La primera letra de la contraseña debe ser mayúscula';
        } else if (!/\d/.test(userData.password)) {
            newErrors.password = 'La contraseña debe contener al menos un número';
        }

        setErrors(newErrors);  // Actualiza el estado de los errores con las validaciones
        return Object.keys(newErrors).length === 0;  // Si no hay errores, devuelve true
    };

    // Función para manejar el registro del usuario
    const handleRegister = async () => {
        if (validateForm()) {  // Solo si el formulario es válido
            try {
                // Realiza una solicitud POST para registrar al usuario en el backend
                const response = await axios.post(
                    'http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser',
                    userData  // Envía los datos del usuario al backend
                );
                console.log('Respuesta del servidor:', response.data);

                // Si la respuesta del servidor indica éxito, muestra un mensaje y redirige al inicio
                if (response.data.status === 'success') {
                    alert('Registro exitoso');
                    navigate('/');  // Redirige al usuario a la página principal después del registro
                } else {
                    alert(`Error: ${response.data.message}`);  // Muestra un mensaje de error si no fue exitoso
                }
            } catch (error) {
                // Si hay un error en la solicitud, lo captura y muestra un mensaje de error
                console.error('Error al registrar usuario:', error);
                alert('Error en la conexión o en el servidor');
            }
        } else {
            alert('Por favor, corrige los errores en el formulario');  // Muestra un mensaje si el formulario tiene errores
        }
    };


    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <div className="d-flex justify-content-center align-items-center">
                                <h2 className="text-center mb-4">Registro</h2>
                                <Button variant="link" size="sm" onClick={handleShow}>
                                    <i className="bi bi-question-circle"></i>
                                </Button>
                            </div>

                            <form>
                                <div className="mb-3">
                                    <label htmlFor="dni" className="form-label">DNI*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dni"
                                        placeholder="Introduce tu DNI"
                                        onChange={e => setUserData({ ...userData, dni: e.target.value })}
                                    />
                                    {errors.dni && <div className="text-danger">{errors.dni}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Introduce tu nombre"
                                        onChange={e => setUserData({ ...userData, nombre: e.target.value })}
                                    />
                                    {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellido*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        placeholder="Introduce tu apellido"
                                        onChange={e => setUserData({ ...userData, apellido: e.target.value })}
                                    />
                                    {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Teléfono*</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        placeholder="Introduce tu teléfono"
                                        onChange={e => setUserData({ ...userData, telefono: e.target.value })}
                                    />
                                    {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo electrónico*</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correo"
                                        placeholder="Introduce tu correo"
                                        onChange={e => setUserData({ ...userData, correo: e.target.value })}
                                    />
                                    {errors.correo && <div className="text-danger">{errors.correo}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña*</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Introduce tu contraseña"
                                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                                    />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={handleRegister}
                                >
                                    Registrar
                                </button>
                            </form>

                            {/* Enlace a la página de Login */}
                            <div className="mt-3 text-center">
                                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Modal Explicativo */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Información de Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>DNI:</strong> Debe contener 8 números seguidos de una letra mayúscula. Ejemplo: 12345678A</p>
                    <p><strong>Nombre:</strong> Debe contener solo letras y espacios.</p>
                    <p><strong>Apellido:</strong> Debe contener solo letras y espacios.</p>
                    <p><strong>Teléfono:</strong> Debe contener 9 dígitos.</p>
                    <p><strong>Correo Electrónico:</strong> Debe seguir el formato ejemplo@dominio.com</p>
                    <p><strong>Contraseña:</strong></p>
                    <div>
                        <ul>
                            <li>Debe tener al menos 8 caracteres y no más de 9.</li>
                            <li>La primera letra debe ser mayúscula.</li>
                            <li>Debe contener al menos un número.</li>
                        </ul>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Register;
