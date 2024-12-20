import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';

const Search = () => {
    // Estados para almacenar los libros, filtros y datos de búsqueda
    const [books, setBooks] = useState([]);  // Almacena todos los libros obtenidos
    const [filteredBooks, setFilteredBooks] = useState([]);  // Almacena los libros filtrados según la búsqueda y filtros
    const [searchTerm, setSearchTerm] = useState('');  // Almacena el término de búsqueda
    const [selectedYear, setSelectedYear] = useState('');  // Almacena el año seleccionado para el filtro
    const [selectedPublisher] = useState('');  // Almacena la editorial seleccionada
    const [selectedAuthor, setSelectedAuthor] = useState('');  // Almacena el autor seleccionado
    const [selectedGenre, setSelectedGenre] = useState('');  // Almacena el género seleccionado
    // eslint-disable-next-line
    const [publishers, setPublishers] = useState([]);  // Almacena las editoriales disponibles
    const [authors, setAuthors] = useState([]);  // Almacena los autores disponibles
    const [genres, setGenres] = useState([]);  // Almacena los géneros disponibles
    const [sortOrder, setSortOrder] = useState({ stock: 'asc', year: 'asc' });  // Almacena el orden de clasificación para stock y año

    const { user } = useContext(AuthContext);  // Obtiene el usuario autenticado desde el contexto
    const navigate = useNavigate();  // Hook para navegar entre páginas

    // useEffect para obtener los libros desde la API al cargar el componente
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Realiza una petición GET para obtener los libros desde el backend
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
                setBooks(response.data.data);  // Establece los libros obtenidos
                setFilteredBooks(response.data.data);  // Establece los libros filtrados inicialmente

                // Extrae las editoriales, autores y géneros únicos de los libros
                const uniquePublishers = [...new Set(response.data.data.map(book => book.editorial_id))];
                const uniqueAuthors = [...new Set(response.data.data.map(book => `${book.autor_nombre} ${book.autor_apellido}`))];
                const uniqueGenres = [...new Set(response.data.data.map(book => book.genero))];

                setPublishers(uniquePublishers);  // Establece las editoriales únicas
                setAuthors(uniqueAuthors);  // Establece los autores únicos
                setGenres(uniqueGenres);  // Establece los géneros únicos
            } catch (error) {
                console.error('Error fetching books:', error);  // Muestra un error si la solicitud falla
            }
        };
        fetchBooks();  // Llama a la función fetchBooks para obtener los libros
    }, []);  // Se ejecuta solo una vez al cargar el componente

    // useEffect para filtrar los libros cada vez que cambien los filtros
    useEffect(() => {
        let updatedBooks = books.filter(book =>
            book.titulo.toLowerCase().includes(searchTerm.toLowerCase())  // Filtra por título de libro
        );

        // Aplica los filtros adicionales (año, editorial, autor, género)
        if (selectedYear) {
            updatedBooks = updatedBooks.filter(book => {
                const year = new Date(book.anio).getFullYear();
                return Math.floor(year / 10) * 10 === parseInt(selectedYear);  // Filtra por década
            });
        }

        if (selectedPublisher) {
            updatedBooks = updatedBooks.filter(book => book.editorial_id === selectedPublisher);  // Filtra por editorial
        }

        if (selectedAuthor) {
            updatedBooks = updatedBooks.filter(book =>
                `${book.autor_nombre} ${book.autor_apellido}` === selectedAuthor  // Filtra por autor
            );
        }

        if (selectedGenre) {
            updatedBooks = updatedBooks.filter(book => book.genero === selectedGenre);  // Filtra por género
        }

        setFilteredBooks(updatedBooks);  // Establece los libros filtrados
    }, [searchTerm, selectedYear, selectedPublisher, selectedAuthor, selectedGenre, books]);  // Vuelve a ejecutar el filtro cuando cambian los filtros

    // Función para manejar la clasificación de los libros
    const handleSort = (criteria) => {
        // Alterna el orden de clasificación (ascendente o descendente)
        const newOrder = sortOrder[criteria] === 'asc' ? 'desc' : 'asc';
        setSortOrder({ ...sortOrder, [criteria]: newOrder });

        // Ordena los libros según el criterio seleccionado (stock o año)
        const sortedBooks = [...filteredBooks].sort((a, b) => {
            if (criteria === 'stock') {
                return newOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;  // Ordena por stock
            } else if (criteria === 'year') {
                return newOrder === 'asc' ? new Date(a.anio) - new Date(b.anio) : new Date(b.anio) - new Date(a.anio);  // Ordena por año
            }
            return 0;
        });
        setFilteredBooks(sortedBooks);  // Establece los libros ordenados
    };

    // Función para manejar la reserva de un libro
    const handleReservation = async (isbn) => {
        if (!user) {  // Si no hay usuario autenticado, redirige a la página de login
            navigate('/login');
        } else {
            try {
                // Realiza una solicitud POST para reservar el libro
                const response = await axios.post(
                    'http://localhost/AAA_BibliotecaDGG/backend/api.php?request=reserveBook',
                    { dni: user.dni, isbn }  // Envía el DNI del usuario y el ISBN del libro
                );
                if (response.data.status === 'success') {
                    alert(response.data.message);  // Muestra un mensaje si la reserva fue exitosa
                } else {
                    alert('Error al realizar la reserva: ' + response.data.message);  // Muestra un mensaje si hay un error
                }
            } catch (error) {
                console.error('Error realizando la reserva:', error);  // Muestra un error si la solicitud falla
                alert('Error al realizar la reserva.');
            }
        }
    };

    // JSX para renderizar el formulario de búsqueda, filtros, y la lista de libros
    return (
        <div className="d-flex flex-column min-vh-100" style={{ background: '#f0f0f0'}}>
            <Header />
            {/* Sección de fondo con imagen y estilo */}
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
                    Buscar Libros
                </h1>
            </div>

            <div className="container my-5">

                <div className="card mb-4 shadow-sm" style={{ background: '#d5d5d5' }}>
                    <div className="card-header text-white" style={{ background: '#002B5B' }}>
                        <h2 className="h5 mb-0">Libros Disponibles</h2>
                    </div>
                    <div className="p-3">
                        {/* Barra de búsqueda por título */}
                        <div className="row mb-3">
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Buscar por título..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {/* Filtros: Año, Autor y Género */}
                        <div className="row mb-3">
                            {/* Filtro por año (década) */}
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <label>Año:</label>
                                <select onChange={(e) => setSelectedYear(e.target.value)} className="form-select">
                                    <option value="">Seleccionar década</option>
                                    {['1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010'].map((year) => (
                                        <option key={year} value={year}>{year}s</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro por autor */}
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <label>Autor:</label>
                                <select onChange={(e) => setSelectedAuthor(e.target.value)} className="form-select">
                                    <option value="">Seleccionar autor</option>
                                    {authors.map((author, index) => (
                                        <option key={index} value={author}>{author}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filtro por género */}
                            <div className="col-12 col-md-4">
                                <label>Género:</label>
                                <select onChange={(e) => setSelectedGenre(e.target.value)} className="form-select">
                                    <option value="">Seleccionar género</option>
                                    {genres.map((genre, index) => (
                                        <option key={index} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Botones para ordenar */}
                        <div className="row mt-4">
                            <div className="col-12 d-flex flex-column flex-sm-row justify-content-center gap-2">
                                <button
                                    onClick={() => handleSort('stock')}
                                    className="btn btn-primary"
                                >
                                    Ordenar por Stock {sortOrder.stock === 'asc' ? '↑' : '↓'}
                                </button>

                                <button
                                    onClick={() => handleSort('year')}
                                    className="btn btn-primary"
                                >
                                    Ordenar por Año {sortOrder.year === 'asc' ? '↑' : '↓'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                {/* Muestra los libros filtrados */}
                <div className="row mt-4">
                    {filteredBooks.map(book => (
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 mb-3" key={book.isbn}>
                            <div className="card shadow border-light d-flex flex-column h-100">
                                {/* Título */}
                                <div className="p-2">
                                    <h5 className="card-title text-truncate">{book.titulo}</h5>
                                </div>

                                {/* Contenido: Imagen y resto de información */}
                                <div className="d-flex flex-column flex-sm-row" style={{ flex: '1 1 auto' }}>
                                    <div className="d-flex justify-content-center align-items-center p-2" style={{ flex: '1 0 auto' }}>
                                        <img
                                            src={book.portada}
                                            className="img-fluid"
                                            alt={`Portada de ${book.titulo}`}
                                            style={{
                                                maxWidth: '100px',
                                                maxHeight: '150px',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column overflow-hidden p-2">
                                        <p className="card-text text-truncate">Autor: {book.autor_nombre} {book.autor_apellido}</p>
                                        <p className="card-text">Año: {book.anio}</p>
                                        <p className="card-text">Stock: {book.stock}</p>
                                    </div>
                                </div>
                                <div className="mt-auto p-2">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() => handleReservation(book.isbn)}
                                    >
                                        Reservar
                                    </button>
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