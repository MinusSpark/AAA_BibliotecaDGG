// Ejemplo del componente con modificaciones en cada input para asegurar valores iniciales

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditUser = () => {
    const { dni } = useParams(); // Obtener el DNI del usuario desde la URL
    
    const [userData, setUserData] = useState({
        dni: '',
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
    });
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=users&dni=${dni}`);
                if (response.data.status === 'success') {
                    setUserData(response.data.data || {
                        dni: '',
                        nombre: '',
                        apellido: '',
                        telefono: '',
                        correo: '',
                    }); // Asegúrate de que siempre se establezca un objeto
                } else {
                    alert('Error al cargar los datos del usuario');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData();
    }, [dni]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateUser`, userData);
            alert('Usuario actualizado exitosamente');
            navigate('/admin-panel'); // Redirige al panel de administración
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            alert('Error al actualizar usuario');
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Editar Usuario</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="dni" className="form-label">DNI</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="dni"
                                        name="dni"
                                        value={userData.dni || ''}  // Valor asegurado
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        name="nombre"
                                        value={userData.nombre || ''}  // Valor asegurado
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="apellido"
                                        name="apellido"
                                        value={userData.apellido || ''}  // Valor asegurado
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        name="telefono"
                                        value={userData.telefono || ''}  // Valor asegurado
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="correo" className="form-label">Correo electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="correo"
                                        name="correo"
                                        value={userData.correo || ''}  // Valor asegurado
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Actualizar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default EditUser;
