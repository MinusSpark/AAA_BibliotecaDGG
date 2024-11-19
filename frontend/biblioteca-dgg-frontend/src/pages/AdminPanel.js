import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import UserTable from '../components/admin/UserTable';
import BookTable from '../components/admin/BookTable';
import BorrowedBooksTable from '../components/admin/BorrowedBooksTable';
import AuthorTable from '../components/admin/AuthorTable';
import PublisherTable from '../components/admin/PublisherTable';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [administradores, setAdministradores] = useState([]);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [reservas, setReservas] = useState([]); // Nuevo estado para reservas

    // Comprobar que el usuario sea admin
    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirigir si no es admin
        }

        const fetchData = async (url, setState) => {
            try {
                const response = await axios.get(url);
                if (response.data.status === 'success' && Array.isArray(response.data.data)) {
                    setState(response.data.data);
                } else {
                    setState([]); // Default to empty array if data is not as expected
                }
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                setState([]); // Set state to empty array on error
            }
        };

        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=users', setUsers);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books', setBooks);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=borrowedBooks', setBorrowedBooks);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=authors', setAuthors);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=publishers', setPublishers);
    }, [user, navigate]);

    // Cargar reservas pendientes
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=reservasPendientes');
                if (response.data.status === 'success') {
                    setReservas(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    // Función para aprobar una reserva
    const handleApprove = async (reservaId) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=aceptarReserva', { reserva_id: reservaId });
            if (response.data.status === 'success') {
                alert('Reserva aceptada.');
                setReservas(reservas.filter((reserva) => reserva.id !== reservaId)); // Eliminar reserva de la lista
            }
        } catch (error) {
            console.error('Error al aceptar reserva:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Panel de Administrador</h1>
                <p className="text-center mb-5">Gestiona usuarios, inventario de libros y más desde aquí.</p>

                {/* Mostrar reservas pendientes */}
                <div className="card mb-4 shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h2 className="h5 mb-0">Reservas Pendientes</h2>
                    </div>
                    <div className="card-body">
                        {reservas.length === 0 ? (
                            <p>No hay reservas pendientes.</p>
                        ) : (
                            reservas.map((reserva) => (
                                <div key={reserva.id} className="d-flex justify-content-between align-items-center mb-3">
                                    <p>
                                        Usuario: {reserva.usuario_dni} ({reserva.nombre}) reservó el libro: {reserva.titulo} ({reserva.libro_isbn})
                                    </p>
                                    <button className="btn btn-success" onClick={() => handleApprove(reserva.id)}>
                                        Aceptar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Otros componentes */}
                <UserTable users={users} setUsers={setUsers} />
                <BookTable books={books} setBooks={setBooks} authors={authors} publishers={publishers} />
                <BorrowedBooksTable borrowedBooks={borrowedBooks} />
                <AuthorTable authors={authors} />
                <PublisherTable publishers={publishers} />
            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;
