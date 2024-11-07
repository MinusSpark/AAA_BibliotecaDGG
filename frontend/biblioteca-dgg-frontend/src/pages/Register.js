import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Register() {
    const [userData, setUserData] = useState({
        dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: ''
    });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser', userData);
            alert('Registro exitoso');
            navigate('/');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Registro</h2>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="dni" className="form-label">DNI</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dni"
                                        placeholder="Introduce tu DNI"
                                        onChange={e => setUserData({ ...userData, dni: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        placeholder="Introduce tu nombre"
                                        onChange={e => setUserData({ ...userData, nombre: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        placeholder="Introduce tu apellido"
                                        onChange={e => setUserData({ ...userData, apellido: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        placeholder="Introduce tu teléfono"
                                        onChange={e => setUserData({ ...userData, telefono: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correo"
                                        placeholder="Introduce tu correo"
                                        onChange={e => setUserData({ ...userData, correo: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Introduce tu contraseña"
                                        onChange={e => setUserData({ ...userData, password: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary w-100"
                                    onClick={handleRegister}
                                >
                                    Registrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Register;
