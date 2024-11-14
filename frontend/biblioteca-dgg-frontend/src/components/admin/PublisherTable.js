import React from 'react';

const PublisherTable = ({ publishers }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h2 className="h5 mb-0">Editoriales</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Fecha de Fundación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.map(publisher => (
                            <tr key={publisher.id}>
                                <td>{publisher.id}</td>
                                <td>{publisher.nombre}</td>
                                <td>{publisher.telefono}</td>
                                <td>{publisher.direccion}</td>
                                <td>{publisher.fecha_nacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublisherTable;
