import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookTable = ({ books, setBooks }) => {
    const [newBook, setNewBook] = useState({
        isbn: '',
        titulo: '',
        anio: '',
        autor_dni: '',
        editorial_id: '',
        genero: '',
        stock: '',
        portada: ''
    });
    const [authors, setAuthors] = useState([]);
    const [editorials, setEditorials] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Obtener autores y editoriales al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authorsResponse, editorialsResponse] = await Promise.all([
                    axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=authors'),
                    axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=publishers')
                ]);
                console.log('Autores:', authorsResponse.data);
                setAuthors(authorsResponse.data.data || []); // Asegura que sea un array
                setEditorials(editorialsResponse.data.data || []); // Si aplica lo mismo para editoriales
            } catch (error) {
                console.error('Error al obtener autores y editoriales:', error);
                setAuthors([]); // Establece un valor por defecto en caso de error
                setEditorials([]);
            }
        };
        fetchData();
    }, []);



    const handleAddBook = async () => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerBook', newBook);
            if (response.data.status === 'success') {
                setBooks([...books, newBook]);
                setShowAddForm(false);
                setNewBook({
                    isbn: '',
                    titulo: '',
                    anio: '',
                    autor_dni: '',
                    editorial_id: '',
                    genero: '',
                    stock: '',
                    portada: ''
                });
                alert('Libro añadido exitosamente');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error al añadir libro:', error);
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
                                    <button className="btn btn-warning btn-sm me-1">Editar</button>
                                    <button
                                        onClick={() => handleDeleteBook(book.isbn)}
                                        className="btn btn-danger btn-sm">
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn btn-success btn-sm mt-2">
                    Añadir Libro
                </button>
            </div>

            {showAddForm && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-success text-white p-1">
                        <h3 className="h6 mb-0">Añadir Libro</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="ISBN"
                            value={newBook.isbn}
                            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                        />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Título"
                            value={newBook.titulo}
                            onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })}
                        />
                        <input
                            type="date"
                            className="form-control mb-2"
                            placeholder="Año"
                            value={newBook.anio}
                            onChange={(e) => setNewBook({ ...newBook, anio: e.target.value })}
                        />
                        <select
                            className="form-control mb-2"
                            value={newBook.autor_dni}
                            onChange={(e) => setNewBook({ ...newBook, autor_dni: e.target.value })}
                        >
                            <option value="">Seleccione un autor</option>
                            {authors.map(author => (
                                <option key={author.dni} value={author.dni}>
                                    {author.nombre} {author.apellido}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-control mb-2"
                            value={newBook.editorial_id}
                            onChange={(e) => setNewBook({ ...newBook, editorial_id: e.target.value })}
                        >
                            <option value="">Seleccione una editorial</option>
                            {editorials.map(editorial => (
                                <option key={editorial.id} value={editorial.id}>
                                    {editorial.nombre}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Género"
                            value={newBook.genero}
                            onChange={(e) => setNewBook({ ...newBook, genero: e.target.value })}
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Stock"
                            value={newBook.stock}
                            onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                        />
                        <input
                            type="url"
                            className="form-control mb-2"
                            placeholder="Portada (URL)"
                            value={newBook.portada}
                            onChange={(e) => setNewBook({ ...newBook, portada: e.target.value })}
                        />
                        <button onClick={handleAddBook} className="btn btn-primary btn-sm me-2">Guardar</button>
                        <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;