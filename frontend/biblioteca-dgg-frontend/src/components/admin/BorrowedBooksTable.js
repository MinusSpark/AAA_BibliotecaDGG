import React from 'react';

const BorrowedBooksTable = ({ borrowedBooks }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h2 className="h5 mb-0">Libros Prestados</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>ISBN</th>
                            <th>Título del Libro</th>
                            <th>DNI Usuario</th>
                            <th>Nombre del Usuario</th>
                            <th>Fecha Préstamo</th>
                            <th>Fecha Devolución</th>
                        </tr>
                    </thead>
                    <tbody>
                        {borrowedBooks.map(borrowed => (
                            <tr key={borrowed.id}>
                                <td>{borrowed.id}</td>
                                <td>{borrowed.isbn}</td>
                                <td>{borrowed.libro_titulo}</td>
                                <td>{borrowed.dni_usuario}</td>
                                <td>{borrowed.usuario_nombre} {borrowed.usuario_apellido}</td>
                                <td>{borrowed.fecha_prestamo}</td>
                                <td>{borrowed.fecha_devolucion || 'No devuelto'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowedBooksTable;
