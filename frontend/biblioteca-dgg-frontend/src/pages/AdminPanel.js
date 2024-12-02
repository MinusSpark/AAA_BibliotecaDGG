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
import ReservationsTable from '../components/admin/ReservationsTable';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';

const AdminPanel = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    //const [administradores, setAdministradores] = useState([]);
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);


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

        /*cambiar nombre a adminpanelnoseque*/
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=users', setUsers);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books', setBooks);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=pendingReservations', setReservations);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=authors', setAuthors);
        fetchData('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=publishers', setPublishers);
    }, [user, navigate]);

    return (
        <div style={{ background: '#f0f0f0'}}>
            <Header />{/* Sección de fondo con imagen y estilo */}
            <div
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,  // Establece la imagen de fondo
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(0px)',  // Sin filtro de desenfoque
                    position: 'relative',
                    color: 'white',
                    textAlign: 'center',
                    padding: '5rem 0',  // Padding para darle espacio a la sección
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Filtro oscuro para mejorar la legibilidad del texto
                        zIndex: 1,
                    }}
                ></div>
                <h1
                    style={{
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    Panel de Administrador
                </h1>
            </div>
            <div className="container mt-5">


                <ReservationsTable reservations={reservations} setReservations={setReservations} setBorrowedBooks={setBorrowedBooks} />
                <UserTable users={users} setUsers={setUsers} />
                <BookTable books={books} setBooks={setBooks} authors={authors} publishers={publishers} />
                <BorrowedBooksTable borrowedBooks={borrowedBooks} />
                <AuthorTable authors={authors} setAuthors={setAuthors} />
                <PublisherTable publishers={publishers} setPublishers={setPublishers} />
            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;
