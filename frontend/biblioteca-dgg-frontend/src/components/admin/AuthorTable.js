import React from 'react';

const AuthorTable = ({ authors }) => {
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h2 className="h5 mb-0">Autores</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de Nacimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map(author => (
                            <tr key={author.dni}>
                                <td>{author.dni}</td>
                                <td>{author.nombre}</td>
                                <td>{author.apellido}</td>
                                <td>{author.fecha_nacimiento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuthorTable;
