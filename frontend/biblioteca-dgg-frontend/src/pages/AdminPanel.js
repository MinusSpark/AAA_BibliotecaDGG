import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirige si no es admin
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=users');
                if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                    setUsers(response.data.data);
                } else {
                    console.error('La respuesta no es un array:', response.data);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [user, navigate]);

    const handleDelete = async (dni) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteUser&dni=${dni}`);
                setUsers(users.filter(user => user.dni !== dni)); // Actualiza la lista de usuarios
                alert('Usuario eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
                alert('Error al eliminar usuario');
            }
        }
    };

    const handleEdit = (dni) => {
        navigate(`/edit-user/${dni}`); // Redirige a la página de edición
    };

    return (
        <div>
            <Header />
            <h1>Panel de Administrador</h1>
            <p>Gestiona usuarios, inventario de libros y más desde aquí.</p>

            <h2 className="mt-4">Usuarios Registrados</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.dni}>
                            <td>{user.dni}</td>
                            <td>{user.nombre}</td>
                            <td>{user.apellido}</td>
                            <td>{user.telefono}</td>
                            <td>{user.correo}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.dni)}>Eliminar</button>
                                <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user.dni)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default AdminPanel;
