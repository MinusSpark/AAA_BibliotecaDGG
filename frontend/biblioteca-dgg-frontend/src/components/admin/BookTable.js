import React, { useState } from 'react';
import axios from 'axios';

const BookTable = ({ books, setBooks, authors, publishers }) => {
    const [newBook, setNewBook] = useState({ isbn: '', titulo: '', año: '', autor: '', editorial: '', genero: '', stock: '', portada: '' });
    const [editBook, setEditBook] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleAddBook = async () => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerBook', newBook);
            if (response.data.status === 'success') {
                setBooks([...books, newBook]);
                setShowAddForm(false);
                setNewBook({ isbn: '', titulo: '', año: '', autor: '', editorial: '', genero: '', stock: '', portada: '' });
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteBook = async (isbn) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteBook&isbn=${isbn}`);
                if (response.data.status === 'success') {
                    setBooks(books.filter(book => book.isbn !== isbn));
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleEditBook = async () => {
        try {
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateBook', editBook);
            if (response.data.status === 'success') {
                setBooks(books.map(book => (book.isbn === editBook.isbn ? editBook : book)));
                setShowEditForm(false);
                setEditBook(null);
            } else {
                console.error('Error updating book:', response.data.message);
            }
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
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
                            <th>Género</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book => (
                            <tr key={book.isbn}>
                                <td>{book.isbn}</td>
                                <td>{book.titulo}</td>
                                <td>{book.año}</td>
                                <td>{book.autor_nombre} {book.autor_apellido}</td>
                                <td>{book.editorial_nombre}</td>
                                <td>{book.genero}</td>
                                <td>{book.stock}</td>
                                <td>
                                    <button onClick={() => { setEditBook(book); setShowEditForm(true); }} className="btn btn-warning">Editar</button>
                                    <button onClick={() => handleDeleteBook(book.isbn)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setShowAddForm(true)} className="btn btn-success">Añadir Libro</button>
                {/* Formulario para Añadir Libro */}
                {showAddForm && (
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h5 mb-0">Añadir Libro</h2>
                        </div>
                        <div className="card-body">
                            <input type="text" placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
                            <input type="text" placeholder="Título" value={newBook.titulo} onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })} />
                            <input type="text" placeholder="Año" value={newBook.año} onChange={(e) => setNewBook({ ...newBook, año: e.target.value })} />
                            <select value={newBook.autor} onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}>
                                <option value="">Seleccionar Autor</option>
                                {authors.map(author => (
                                    <option key={author.dni} value={author.dni}>{author.nombre} {author.apellido}</option>
                                ))}
                            </select>
                            <select value={newBook.editorial} onChange={(e) => setNewBook({ ...newBook, editorial: e.target.value })}>
                                <option value="">Seleccionar Editorial</option>
                                {publishers.map(publisher => (
                                    <option key={publisher.id} value={publisher.id}>{publisher.nombre}</option>
                                ))}
                            </select>
                            <input type="text" placeholder="Género" value={newBook.genero} onChange={(e) => setNewBook({ ...newBook, genero: e.target.value })} />
                            <input type="number" placeholder="Stock" value={newBook.stock} onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })} />
                            <input type="text" placeholder="Portada (URL)" value={newBook.portada} onChange={(e) => setNewBook({ ...newBook, portada: e.target.value })} />
                            <button onClick={handleAddBook} className="btn btn-primary">Guardar</button>
                            <button onClick={() => setShowAddForm(false)} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                )}

                {/* Formulario para Editar Libro */}
                {showEditForm && editBook && (
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-warning text-white">
                            <h2 className="h5 mb-0">Editar Libro</h2>
                        </div>
                        <div className="card-body">
                            <input type="text" placeholder="ISBN" value={editBook.isbn} readOnly />
                            <input type="text" placeholder="Título" value={editBook.titulo} onChange={(e) => setEditBook({ ...editBook, titulo: e.target.value })} />
                            <input type="text" placeholder="Año" value={editBook.año} onChange={(e) => setEditBook({ ...editBook, año: e.target.value })} />
                            <select value={editBook.autor} onChange={(e) => setEditBook({ ...editBook, autor: e.target.value })}>
                                <option value="">Seleccionar Autor</option>
                                {authors.map(author => (
                                    <option key={author.dni} value={author.dni}>{author.nombre} {author.apellido}</option>
                                ))}
                            </select>
                            <select value={editBook.editorial} onChange={(e) => setEditBook({ ...editBook, editorial: e.target.value })}>
                                <option value="">Seleccionar Editorial</option>
                                {publishers.map(publisher => (
                                    <option key={publisher.id} value={publisher.id}>{publisher.nombre}</option>
                                ))}
                            </select>
                            <input type="text" placeholder="Género" value={editBook.genero} onChange={(e) => setEditBook({ ...editBook, genero: e.target.value })} />
                            <input type="number" placeholder="Stock" value={editBook.stock} onChange={(e) => setEditBook({ ...editBook, stock: e.target.value })} />
                            <input type="text" placeholder="Portada (URL)" value={editBook.portada} onChange={(e) => setEditBook({ ...editBook, portada: e.target.value })} />
                            <button onClick={handleEditBook} className="btn btn-primary">Guardar Cambios</button>
                            <button onClick={() => setShowEditForm(false)} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTable;
