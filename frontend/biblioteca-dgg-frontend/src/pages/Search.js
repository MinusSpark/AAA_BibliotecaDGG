import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const searchBooks = () => {
        axios.get(`http://localhost:3001/api/books?query=${query}`)
            .then(response => setResults(response.data))
            .catch(error => console.error('Error en la búsqueda:', error));
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar libros"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={searchBooks}>Buscar</button>

            <ul>
                {results.map(book => (
                    <li key={book.isbn}>{book.titulo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
