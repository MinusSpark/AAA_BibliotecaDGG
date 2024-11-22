import React, { useState } from 'react';
import axios from 'axios';

const BookTable = ({ books, setBooks }) => {
    const [newBook, setNewBook] = useState({
        isbn: '',
        titulo: '',
        año: '',
        autor_dni: '',
        editorial_id: '',
        genero: '',
        stock: '',
        portada: ''
    });
    const [editingBook, setEditingBook] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleAddBook = async () => {
        if (!newBook.isbn || !newBook.titulo || !newBook.año || !newBook.autor_dni || !newBook.editorial_id || !newBook.stock) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerBook', newBook);
            if (response.data.status === 'success') {
                setBooks([...books, newBook]);
                setShowAddForm(false);
                setNewBook({ isbn: '', titulo: '', año: '', autor_dni: '', editorial_id: '', genero: '', stock: '', portada: '' });
                alert('Libro añadido exitosamente.');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error adding book: ', error);
            alert('Hubo un error al añadir el libro.');
        }
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
        if (!editingBook.isbn || !editingBook.titulo || !editingBook.año || !editingBook.autor_dni || !editingBook.editorial_id || !editingBook.stock) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        try {
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateBook', editingBook);
            if (response.data.status === 'success') {
                setBooks(books.map(book => (book.isbn === editingBook.isbn ? editingBook : book)));
                setShowEditForm(false);
                setEditingBook(null);
                alert('Libro actualizado exitosamente.');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Hubo un error al actualizar el libro.');
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
                                    <button
                                        onClick={() => {
                                            setEditingBook({ ...book });  // Asegúrate de copiar todos los valores del libro
                                            setShowEditForm(true);
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
                    onClick={() => setShowAddForm(true)}
                    className='btn btn-success btn-sm mt-2'
                >
                    Añadir Usuario
                </button>
            </div>

            {/* Formulario para Añadir Libros */}
            {showAddForm && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-success text-white p-1">
                        <h3 className="h6 mb-0">Añadir Libros</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="ISBN"
                            value={newBook.isbn}
                            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="titulo"
                            value={newBook.titulo}
                            onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })} />
                        <input
                            type="date"  // Cambia de "text" a "date"
                            className="form-control mb-2"
                            value={newBook.año}
                            onChange={(e) => setNewBook({ ...newBook, año: e.target.value })}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="autor_dni"
                            value={newBook.autor_dni}
                            onChange={(e) => setNewBook({ ...newBook, autor_dni: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="editorial_id"
                            value={newBook.editorial_id}
                            onChange={(e) => setNewBook({ ...newBook, editorial_id: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="genero"
                            value={newBook.genero}
                            onChange={(e) => setNewBook({ ...newBook, genero: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="stock"
                            value={newBook.stock}
                            onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="portada"
                            value={newBook.portada}
                            onChange={(e) => setNewBook({ ...newBook, portada: e.target.value })} />

                        <button onClick={handleAddBook} className="btn btn-primary btn-sm me-2">Guardar</button>
                        <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}

            {/* Formulario para Editar Libro */}
            {showEditForm && editingBook && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-warning text-white p-1">
                        <h3 className="h6 mb-0">Editar Libro</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.isbn}
                            readOnly />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.titulo}
                            onChange={(e) => setEditingBook({ ...editingBook, titulo: e.target.value })} />
                        <input
                            type="date"  // Cambia de "text" a "date"
                            className="form-control mb-2"
                            value={editingBook.año}
                            onChange={(e) => setEditingBook({ ...editingBook, año: e.target.value })}
                        />

                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.autor_dni}
                            onChange={(e) => setEditingBook({ ...editingBook, autor_dni: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.editorial_id}
                            onChange={(e) => setEditingBook({ ...editingBook, editorial_id: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.genero}
                            onChange={(e) => setEditingBook({ ...editingBook, genero: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.stock}
                            onChange={(e) => setEditingBook({ ...editingBook, stock: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editingBook.portada}
                            onChange={(e) => setEditingBook({ ...editingBook, portada: e.target.value })} />

                        <button onClick={handleEditBook} className="btn btn-primary btn-sm me-2">Guardar Cambios</button>
                        <button onClick={() => setShowEditForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;
