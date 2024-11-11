import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

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
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchBooks = async () => {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
            setBooks(response.data.data);
        };

        const fetchBorrowedBooks = async () => {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=borrowedBooks');
            setBorrowedBooks(response.data.data);
        };

        const fetchAuthors = async () => {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=authors'); // Asegúrate de tener esta ruta en tu API
            setAuthors(response.data.data);
        };

        const fetchPublishers = async () => {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=publishers'); // Asegúrate de tener esta ruta en tu API
            setPublishers(response.data.data);
        };

        fetchUsers();
        fetchBooks();
        fetchBorrowedBooks();
        fetchAuthors();
        fetchPublishers();
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
            <div className="container mt-5">
                <h1 className="text-center mb-4">Panel de Administrador</h1>
                <p className="text-center mb-5">Gestiona usuarios, inventario de libros y más desde aquí.</p>

                {/* Tabla de Usuarios */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h2 className="h5 mb-0">Usuarios Registrados</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
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
                                            <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(user.dni)}>Eliminar</button>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(user.dni)}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla de Libros Disponibles */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h2 className="h5 mb-0">Libros Disponibles</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>ISBN</th>
                                    <th>Título</th>
                                    <th>Año</th>
                                    <th>Autor</th>
                                    <th>Editorial</th>
                                    <th>Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr key={book.isbn}>
                                        <td>{book.isbn}</td>
                                        <td>{book.titulo}</td>
                                        <td>{book.año}</td>
                                        <td>{book.autor_dni}</td>
                                        <td>{book.editorial_id}</td>
                                        <td>{book.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla de Libros Prestados */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h2 className="h5 mb-0">Libros Prestados</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>ISBN</th>
                                    <th>DNI Usuario</th>
                                    <th>Fecha Préstamo</th>
                                    <th>Fecha Devolución</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowedBooks.map(borrowed => (
                                    <tr key={borrowed.id}>
                                        <td>{borrowed.id}</td>
                                        <td>{borrowed.isbn}</td>
                                        <td>{borrowed.dni_usuario}</td>
                                        <td>{borrowed.fecha_prestamo}</td>
                                        <td>{borrowed.fecha_devolucion || 'No devuelto'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla de Autores */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h2 className="h5 mb-0">Autores</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>DNI</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Fecha de Nacimiento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.map(author => (
                                    <tr key={author.dni}>
                                        <td>{author.dni}</td>
                                        <td>{author.nombre}</td>
                                        <td>{author.apellido}</td>
                                        <td>{author.fecha_nacimiento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla de Editoriales */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h2 className="h5 mb-0">Editoriales</h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                    <th>Fecha de Fundación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {publishers.map(publisher => (
                                    <tr key={publisher.id}>
                                        <td>{publisher.id}</td>
                                        <td>{publisher.nombre}</td>
                                        <td>{publisher.telefono}</td>
                                        <td>{publisher.direccion}</td>
                                        <td>{publisher.fecha_nacimiento}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;
