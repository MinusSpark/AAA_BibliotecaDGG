import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookTable = ({ books, setBooks }) => {
    // Estado para gestionar los valores del libro y el formulario
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

    // Estado para saber si estamos en modo edición
    const [editMode, setEditMode] = useState(false);

    // Estados para los datos de autores y editoriales (listas desplegables)
    const [authors, setAuthors] = useState([]);
    const [editorials, setEditorials] = useState([]);

    // Estado para mostrar/ocultar el formulario de añadir libro
    const [showAddForm, setShowAddForm] = useState(false);

    // Cargar autores y editoriales cuando el componente se monta
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [authorsResponse, editorialsResponse] = await Promise.all([
                    axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=authors'),
                    axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=publishers')
                ]);
                setAuthors(authorsResponse.data.data || []);  // Si hay datos, se cargan en el estado
                setEditorials(editorialsResponse.data.data || []);
            } catch (error) {
                console.error('Error al obtener autores y editoriales:', error);
                setAuthors([]);  // En caso de error, se asegura de que los datos sean vacíos
                setEditorials([]);
            }
        };
        fetchData(); // Llamada a la API para obtener los datos
    }, []);  // Solo se ejecuta al montar el componente

    // Función para añadir un nuevo libro
    const handleAddBook = async () => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerBook', newBook);
            if (response.data.status === 'success') {
                setBooks([...books, newBook]);  // Actualiza la lista de libros con el nuevo libro
                setShowAddForm(false);  // Oculta el formulario
                resetForm();  // Resetea el formulario
                alert('Libro añadido exitosamente');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error al añadir libro:', error);
            alert('Hubo un error al añadir el libro.');
        }
    };

    // Función para eliminar un libro
    const handleDeleteBook = async (isbn) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteBook&isbn=${isbn}`);
                if (response.data.status === 'success') {
                    setBooks(books.filter(book => book.isbn !== isbn));  // Filtra el libro eliminado
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

    // Función para editar un libro existente
    const handleEditBook = async () => {
        try {
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateBook', newBook);
            if (response.data.status === 'success') {
                // Actualiza la lista de libros con los datos editados
                const updatedBooks = books.map(book =>
                    book.isbn === newBook.isbn ? { ...newBook } : book
                );
                setBooks(updatedBooks);
                resetForm();
                alert('Libro actualizado exitosamente');
            } else {
                alert('Error: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error al actualizar libro:', error);
            alert('Hubo un error al actualizar el libro.');
        }
    };

    // Función para abrir el formulario de edición de un libro
    const handleOpenEditForm = (book) => {
        setNewBook({
            ...book,  // Prellena el formulario con los datos del libro
            autor_dni: book.autor_dni,  // DNI del autor
            editorial_id: book.editorial_id  // ID de la editorial
        });
        setEditMode(true);  // Habilita el modo edición
        setShowAddForm(true);  // Muestra el formulario
    };

    // Resetea el formulario
    const resetForm = () => {
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
        setEditMode(false);  // Desactiva el modo edición
        setShowAddForm(false);  // Oculta el formulario
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
                                        onClick={() => handleOpenEditForm(book)}
                                        className="btn btn-warning btn-sm me-1">
                                        Editar
                                    </button>
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

            {/* Formulario para añadir o editar un libro */}
            {showAddForm && (
                <div className="card mt-3 p-2">
                    <div className={`card-header text-white p-1 ${editMode ? 'bg-warning' : 'bg-success'}`}>
                        <h3 className="h6 mb-0">{editMode ? 'Editar Libro' : 'Añadir Libro'}</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="ISBN"
                            value={newBook.isbn}
                            disabled={editMode} // Deshabilitar en modo edición
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
                            value={newBook.autor_dni} // Asegúrate de que el valor corresponda al autor actual
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
                            value={newBook.editorial_id} // Asegúrate de que el valor corresponda a la editorial actual
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
                        <button
                            onClick={editMode ? handleEditBook : handleAddBook}
                            className="btn btn-primary btn-sm me-2">
                            {editMode ? 'Actualizar' : 'Guardar'}
                        </button>
                        <button onClick={resetForm} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookTable;