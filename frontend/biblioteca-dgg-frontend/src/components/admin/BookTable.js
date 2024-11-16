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
                                <td className="text-center">{book.año}</td>
                                <td>{book.autor_nombre} {book.autor_apellido}</td>
                                <td>{book.editorial_nombre}</td>
                                <td>{book.genero}</td>
                                <td className="text-center">{book.stock}</td>
                                <td className="text-center">
                                    <button onClick={() => { setEditBook(book); setShowEditForm(true); }} className="btn btn-warning btn-sm me-1">Editar</button>
                                    <button onClick={() => handleDeleteBook(book.isbn)} className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setShowAddForm(true)} className="btn btn-success btn-sm mt-2">Añadir Libro</button>
                {/* Formulario para Añadir Libro */}
                {showAddForm && (
                    <div className="card mb-3 shadow-sm mt-2">
                        <div className="card-header bg-primary text-white p-2">
                            <h2 className="h6 mb-0">Añadir Libro</h2>
                        </div>
                        <div className="card-body p-2">
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Título" value={newBook.titulo} onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Año" value={newBook.año} onChange={(e) => setNewBook({ ...newBook, año: e.target.value })} />
                            <select className="form-select form-select-sm mb-2" value={newBook.autor} onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}>
                                <option value="">Seleccionar Autor</option>
                                {authors.map(author => (
                                    <option key={author.dni} value={author.dni}>{author.nombre} {author.apellido}</option>
                                ))}
                            </select>
                            <select className="form-select form-select-sm mb-2" value={newBook.editorial} onChange={(e) => setNewBook({ ...newBook, editorial: e.target.value })}>
                                <option value="">Seleccionar Editorial</option>
                                {publishers.map(publisher => (
                                    <option key={publisher.id} value={publisher.id}>{publisher.nombre}</option>
                                ))}
                            </select>
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Género" value={newBook.genero} onChange={(e) => setNewBook({ ...newBook, genero: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="number" placeholder="Stock" value={newBook.stock} onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Portada (URL)" value={newBook.portada} onChange={(e) => setNewBook({ ...newBook, portada: e.target.value })} />
                            <button onClick={handleAddBook} className="btn btn-primary btn-sm me-1">Guardar</button>
                            <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                        </div>
                    </div>
                )}

                {/* Formulario para Editar Libro */}
                {showEditForm && editBook && (
                    <div className="card mb-3 shadow-sm mt-2">
                        <div className="card-header bg-warning text-white p-2">
                            <h2 className="h6 mb-0">Editar Libro</h2>
                        </div>
                        <div className="card-body p-2">
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="ISBN" value={editBook.isbn} readOnly />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Título" value={editBook.titulo} onChange={(e) => setEditBook({ ...editBook, titulo: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Año" value={editBook.año} onChange={(e) => setEditBook({ ...editBook, año: e.target.value })} />
                            <select className="form-select form-select-sm mb-2" value={editBook.autor} onChange={(e) => setEditBook({ ...editBook, autor: e.target.value })}>
                                <option value="">Seleccionar Autor</option>
                                {authors.map(author => (
                                    <option key={author.dni} value={author.dni}>{author.nombre} {author.apellido}</option>
                                ))}
                            </select>
                            <select className="form-select form-select-sm mb-2" value={editBook.editorial} onChange={(e) => setEditBook({ ...editBook, editorial: e.target.value })}>
                                <option value="">Seleccionar Editorial</option>
                                {publishers.map(publisher => (
                                    <option key={publisher.id} value={publisher.id}>{publisher.nombre}</option>
                                ))}
                            </select>
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Género" value={editBook.genero} onChange={(e) => setEditBook({ ...editBook, genero: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="number" placeholder="Stock" value={editBook.stock} onChange={(e) => setEditBook({ ...editBook, stock: e.target.value })} />
                            <input className="form-control form-control-sm mb-2" type="text" placeholder="Portada (URL)" value={editBook.portada} onChange={(e) => setEditBook({ ...editBook, portada: e.target.value })} />
                            <button onClick={handleEditBook} className="btn btn-primary btn-sm me-1">Guardar Cambios</button>
                            <button onClick={() => setShowEditForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTable;
