import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const Search = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPublisher, setSelectedPublisher] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [sortOrder, setSortOrder] = useState({ stock: 'asc', year: 'asc' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
                setBooks(response.data.data);
                setFilteredBooks(response.data.data);

                // Extraer autores, editoriales y géneros únicos
                const uniquePublishers = [...new Set(response.data.data.map(book => book.editorial_id))];
                const uniqueAuthors = [...new Set(response.data.data.map(book => `${book.autor_nombre} ${book.autor_apellido}`))];
                const uniqueGenres = [...new Set(response.data.data.map(book => book.genero))];

                setPublishers(uniquePublishers);
                setAuthors(uniqueAuthors);
                setGenres(uniqueGenres);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    useEffect(() => {
        let updatedBooks = books.filter(book =>
            book.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedYear) {
            updatedBooks = updatedBooks.filter(book => {
                const year = new Date(book.anio).getFullYear();
                return Math.floor(year / 10) * 10 === parseInt(selectedYear);
            });
        }

        if (selectedPublisher) {
            updatedBooks = updatedBooks.filter(book => book.editorial_id === selectedPublisher);
        }

        if (selectedAuthor) {
            updatedBooks = updatedBooks.filter(book =>
                `${book.autor_nombre} ${book.autor_apellido}` === selectedAuthor
            );
        }

        if (selectedGenre) {
            updatedBooks = updatedBooks.filter(book => book.genero === selectedGenre);
        }

        setFilteredBooks(updatedBooks);
    }, [searchTerm, selectedYear, selectedPublisher, selectedAuthor, selectedGenre, books]);

    const handleSort = (criteria) => {
        const newOrder = sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
        setSortOrder({ ...sortOrder, [criteria]: newOrder });

        const sortedBooks = [...filteredBooks].sort((a, b) => {
            if (criteria === 'stock') {
                return newOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock; // Ordenar según la dirección
            } else if (criteria === 'year') {
                return newOrder === 'asc' ? new Date(a.anio) - new Date(b.anio) : new Date(b.anio) - new Date(a.anio); // Ordenar según la dirección
            }
            return 0;
        });
        setFilteredBooks(sortedBooks);
    };

    const handleReservation = async (isbn) => {
        if (!user) {
            navigate('/login');
        } else {
            try {
                const response = await axios.post(
                    'http://localhost/AAA_BibliotecaDGG/backend/api.php?request=reserveBook',
                    { dni: user.dni, isbn }
                );
                if (response.data.status === 'success') {
                    alert(response.data.message);
                } else {
                    alert('Error al realizar la reserva: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error realizando la reserva:', error);
                alert('Error al realizar la reserva.');
            }
        }
    };


    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            <div className="container my-5">
                <h1 className="text-center">Buscar Libros</h1>
                <input
                    type="text"
                    placeholder="Buscar por título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control mb-3"
                />

                <div className="mb-3">
                    <label>Año:</label>
                    <select onChange={(e) => setSelectedYear(e.target.value)} className="form-select">
                        <option value="">Seleccionar década</option>
                        <option value="1920">1920s</option>
                        <option value="1930">1930s</option>
                        <option value="1940">1940s</option>
                        <option value="1950">1950s</option>
                        <option value="1960">1960s</option>
                        <option value="1970">1970s</option>
                        <option value="1980">1980s</option>
                        <option value="1990">1990s</option>
                        <option value="2000">2000s</option>
                        <option value="2010">2010s</option>
                        <option value="2020">2020s</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Editorial:</label>
                    <select onChange={(e) => setSelectedPublisher(e.target.value)} className="form-select">
                        <option value="">Seleccionar editorial</option>
                        {publishers.map((publisher, index) => (
                            <option key={index} value={publisher}>{publisher}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Autor:</label>
                    <select onChange={(e) => setSelectedAuthor(e.target.value)} className="form-select">
                        <option value="">Seleccionar autor</option>
                        {authors.map((author, index) => (
                            <option key={index} value={author}>{author}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label>Género:</label>
                    <select onChange={(e) => setSelectedGenre(e.target.value)} className="form-select">
                        <option value="">Seleccionar género</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>


                <div className="container d-flex flex-row justify-content-center mt-4">
                    <button
                        onClick={() => handleSort('stock')}
                        className="btn btn-primary me-2"
                    >
                        Ordenar por Stock
                        {sortOrder.stock === 'asc' ? '↑' : '↓'}
                    </button>

                    <button
                        onClick={() => handleSort('year')}
                        className="btn btn-primary"
                    >
                        Ordenar por Año
                        {sortOrder.year === 'asc' ? '↑' : '↓'}
                    </button>
                </div>
                <div className="row mt-4">
                    {filteredBooks.map(book => (
                        <div className="col-md-2 mb-3" key={book.isbn}>
                            <div className="card" style={{ height: '575px' }}>
                                <img src={book.portada} className="card-img-top" alt={`Portada de ${book.titulo}`} style={{ height: '300px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{book.titulo}</h5>
                                    <p className="card-text">Autor: {book.autor_nombre} {book.autor_apellido}</p>
                                    <p className="card-text">Año: {book.anio}</p>
                                    <p className="card-text">Stock: {book.stock}</p>
                                    <div className="mt-auto">
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleReservation(book.isbn)}
                                        >
                                            Reservar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Search;