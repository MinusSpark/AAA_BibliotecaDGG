import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowedBooksTable = () => {
    // Estado para gestionar los libros prestados y el estado de carga
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect se ejecuta al cargar el componente para obtener los libros prestados
    useEffect(() => {
        fetchBorrowedBooks(); // Llamada a la función que obtiene los libros prestados
    }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

    // Función para obtener los libros prestados desde la API
    const fetchBorrowedBooks = async () => {
        try {
            // Realiza la solicitud HTTP para obtener los libros prestados
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=borrowedBooks');
            if (response.data.status === 'success') {
                setBorrowedBooks(response.data.data || []);  // Si la respuesta es exitosa, actualiza los libros prestados
            } else {
                alert('Error al cargar los libros prestados');  // Muestra un mensaje si hay un error en la respuesta
            }
        } catch (error) {
            console.error('Error al obtener libros prestados:', error);
            alert('Hubo un error al obtener los libros prestados.');  // Manejo de errores en caso de fallo en la solicitud
        } finally {
            setLoading(false);  // Cambia el estado de carga a falso después de que se intente cargar la información
        }
    };

    // Función para devolver un libro
    const handleReturnBook = async (borrowedBookId) => {
        try {
            // Realiza la solicitud para devolver el libro
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=returnBook', {
                borrowedBookId  // Envia el ID del libro prestado para procesar la devolución
            });

            if (response.data.status === 'success') {
                alert('Libro devuelto con éxito.');  // Si la devolución es exitosa, muestra un mensaje
                fetchBorrowedBooks(); // Refresca la lista de libros prestados después de la devolución
            } else {
                alert('No se pudo devolver el libro.');  // Si no se puede devolver el libro, muestra un mensaje de error
            }
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Hubo un error al intentar devolver el libro.');  // Manejo de errores si la devolución falla
        }
    };

    // Si estamos cargando los datos, mostramos un mensaje de carga
    if (loading) {
        return <div>Cargando datos...</div>;  // Mientras se obtienen los datos de los libros prestados
    }

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Libros Prestados</h2>
            </div>
            <div className="card-body p-2">
                <table className="table table-bordered table-sm">
                    <thead className="table-light">
                        <tr>
                            {/* Encabezados de la tabla */}
                            <th className="text-center">ID</th>
                            <th className="text-center">ISBN</th>
                            <th className="text-center">Título del Libro</th>
                            <th className="text-center">DNI Usuario</th>
                            <th className="text-center">Nombre del Usuario</th>
                            <th className="text-center">Fecha Préstamo</th>
                            <th className="text-center">Fecha Devolución</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderiza cada libro prestado en una fila de la tabla */}
                        {borrowedBooks.map(borrowed => (
                            <tr key={borrowed.id}>
                                <td className="text-center">{borrowed.id}</td>
                                <td className="text-center">{borrowed.isbn}</td>
                                <td>{borrowed.libro_titulo}</td>
                                <td className="text-center">{borrowed.dni_usuario}</td>
                                <td>{borrowed.usuario_nombre} {borrowed.usuario_apellido}</td>
                                <td className="text-center">{new Date(borrowed.fecha_prestamo).toLocaleString()}</td>
                                {/* Si la fecha de devolución no existe, muestra 'No devuelto' */}
                                <td className="text-center">
                                    {borrowed.fecha_devolucion ? new Date(borrowed.fecha_devolucion).toLocaleString() : 'No devuelto'}
                                </td>
                                <td className="text-center">
                                    {/* Muestra el botón de devolución solo si el libro no ha sido devuelto */}
                                    {!borrowed.fecha_devolucion && (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleReturnBook(borrowed.id)}  // Al hacer clic, se llama a la función para devolver el libro
                                        >
                                            Devolución
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowedBooksTable;
