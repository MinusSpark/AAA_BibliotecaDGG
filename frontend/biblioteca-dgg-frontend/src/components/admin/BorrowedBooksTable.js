import React from 'react';

const BorrowedBooksTable = ({ borrowedBooks }) => {
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
                                <td className="text-center">{borrowed.fecha_prestamo}</td>
                                <td className="text-center">{borrowed.fecha_devolucion || 'No devuelto'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowedBooksTable;
