import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchBooks = () => {
        axios.get(`http://localhost:3001/api/books?query=${query}`)
            .then(response => setResults(response.data))
            .catch(error => console.error('Error en la búsqueda:', error));
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container my-auto">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg p-4">
                            <h2 className="text-center mb-4">Buscar Libros</h2>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Introduce el título o autor"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100"
                                onClick={searchBooks}
                            >
                                Buscar
                            </button>
                            <div className="mt-4">
                                <h4>Resultados:</h4>
                                <ul className="list-group">
                                    {results.map(book => (
                                        <li key={book.isbn} className="list-group-item">
                                            {book.titulo}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
