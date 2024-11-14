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

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirect if not an admin
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

    useEffect(() => {
        const fetchAdministradores = async () => {
            try {
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=administrators');
                setAdministradores(response.data.data);
            } catch (error) {
                console.error('Error fetching administrators:', error);
            }
        };
        fetchAdministradores();
    }, []);


    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Panel de Administrador</h1>
                <p className="text-center mb-5">Gestiona usuarios, inventario de libros y más desde aquí.</p>

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
