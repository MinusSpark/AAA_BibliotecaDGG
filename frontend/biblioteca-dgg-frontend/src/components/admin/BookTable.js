import React, { useState } from 'react';
import axios from 'axios';

const BookTable = ({ books, setBooks }) => {
    
    const handleAddBook = async () => {
        
    };


    const handleDeleteBook = async (isbn) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteBook&isbn=${isbn}`);
                if (response.data.status === 'success') {
                    setBooks(books.filter(book => book.isbn !== isbn));
                    alert('Libro eliminado exitosamente');
                } else {
                    alert('Error:' + response.data.message);
                }
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
                alert('Hubo un error al eliminar el libro.');
            }
        }
    };

    const handleEditBook = async () => {
        
    };


    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Libros Disponibles</h2>
            </div>
            <div className="card-body p-2">
                <table className="table table-bordered table-sm">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center">ISBN</th>
                            <th className="text-center">Título</th>
                            <th className="text-center">Año</th>
                            <th className="text-center">Autor</th>
                            <th className="text-center">Editorial</th>
                            <th className="text-center">Género</th>
                            <th className="text-center">Stock</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.isbn}>
                                <td className="text-center">{book.isbn}</td>
                                <td>{book.titulo}</td>
                                <td className="text-center">{book.anio}</td>
                                <td>{book.autor_nombre} {book.autor_apellido}</td>
                                <td>{book.editorial_nombre}</td>
                                <td>{book.genero}</td>
                                <td className="text-center">{book.stock}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => {
                                        }}
                                        className="btn btn-warning btn-sm me-1"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDeleteBook(book.isbn)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    className='btn btn-success btn-sm mt-2'
                >
                    Añadir Usuario
                </button>
            </div>

        </div>
    );
};

export default BookTable;
