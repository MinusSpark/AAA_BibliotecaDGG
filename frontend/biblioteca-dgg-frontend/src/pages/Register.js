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
    const [userData, setUserData] = useState({
        dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: ''
    });
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateForm = () => {
        const newErrors = {};

        if (!userData.dni) {
            newErrors.dni = 'El DNI es requerido';
        } else if (!/^\d{8}[A-Z]$/.test(userData.dni)) {
            newErrors.dni = 'El DNI debe tener 8 números y una letra mayúscula';
        }

        if (!userData.nombre) {
            newErrors.nombre = 'El nombre es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(userData.nombre)) {
            newErrors.nombre = 'El nombre debe contener solo letras y espacios';
        }

        if (!userData.apellido) {
            newErrors.apellido = 'El apellido es requerido';
        } else if (!/^[a-zA-Z ]+$/.test(userData.apellido)) {
            newErrors.apellido = 'El apellido debe contener solo letras y espacios';
        }

        if (!userData.telefono) {
            newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^\d{9}$/.test(userData.telefono)) {
            newErrors.telefono = 'El teléfono debe contener 9 dígitos';
        }

        if (!userData.correo) {
            newErrors.correo = 'El correo electrónico es requerido';
        } else if (!/@/.test(userData.correo)) {
            newErrors.correo = 'El correo electrónico debe contener un @';
        } else if (!/\S+@\S+\.\S+/.test(userData.correo)) {
            newErrors.correo = 'El correo electrónico no es válido. Debe seguir el formato ejemplo@dominio.com';
        }

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const response = await axios.post(
                    'http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser',
                    userData
                );
                console.log('Respuesta del servidor:', response.data);
                if (response.data.status === 'success') {
                    alert('Registro exitoso');
                    navigate('/');
                } else {
                    alert(`Error: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Error al registrar usuario:', error);
                alert('Error en la conexión o en el servidor');
            }
        } else {
            alert('Por favor, corrige los errores en el formulario');
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
                                    <i className="bi bi-question-circle"></i> {/* Asegúrate de que la clase bi bi-question-circle esté presente */}
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
                    <p><strong>Contraseña:</strong> 
                        <ul>
                            <li>Debe tener al menos 8 caracteres y no más de 9.</li>
                            <li>La primera letra debe ser mayúscula.</li>
                            <li>Debe contener al menos un número.</li>
                        </ul>
                    </p>
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
