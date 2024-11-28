import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BorrowedBooksTable = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBorrowedBooks();
    }, []);

    const fetchBorrowedBooks = async () => {
        try {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=borrowedBooks');
            if (response.data.status === 'success') {
                setBorrowedBooks(response.data.data || []);
            } else {
                alert('Error al cargar los libros prestados');
            }
        } catch (error) {
            console.error('Error al obtener libros prestados:', error);
            alert('Hubo un error al obtener los libros prestados.');
        } finally {
            setLoading(false);
        }
    };

    const handleReturnBook = async (borrowedBookId) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=returnBook', {
                borrowedBookId
            });

            if (response.data.status === 'success') {
                alert('Libro devuelto con éxito.');
                fetchBorrowedBooks(); // Actualizar la lista
            } else {
                alert('No se pudo devolver el libro.');
            }
        } catch (error) {
            console.error('Error al devolver el libro:', error);
            alert('Hubo un error al intentar devolver el libro.');
        }
    };

    if (loading) {
        return <div>Cargando datos...</div>;
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
                        {borrowedBooks.map(borrowed => (
                            <tr key={borrowed.id}>
                                <td className="text-center">{borrowed.id}</td>
                                <td className="text-center">{borrowed.isbn}</td>
                                <td>{borrowed.libro_titulo}</td>
                                <td className="text-center">{borrowed.dni_usuario}</td>
                                <td>{borrowed.usuario_nombre} {borrowed.usuario_apellido}</td>
                                <td className="text-center">{new Date(borrowed.fecha_prestamo).toLocaleString()}</td>
                                <td className="text-center">{borrowed.fecha_devolucion ? new Date(borrowed.fecha_devolucion).toLocaleString() : 'No devuelto'}</td>
                                <td className="text-center">
                                    {!borrowed.fecha_devolucion && (
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleReturnBook(borrowed.id)}
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
