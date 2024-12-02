import React, { useState } from 'react';
import axios from 'axios';

const AuthorTable = ({ authors, setAuthors }) => {
    // Definimos el estado local para almacenar los datos de los autores y formularios.
    const [newAuthor, setNewAuthor] = useState({ dni: '', nombre: '', apellido: '', fecha_nacimiento: '' });
    const [editAuthor, setEditAuthor] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    // Función para añadir un nuevo autor a través de una solicitud POST a la API
    const handleAddAuthor = async () => {
        try {
            // Enviamos la solicitud POST para agregar el nuevo autor
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=addAuthor', newAuthor);

            if (response.data.status === 'success') {
                // Si la respuesta es exitosa, actualizamos la lista de autores
                setAuthors([...authors, newAuthor]);
                setShowAddForm(false);  // Cerramos el formulario de agregar autor
                setNewAuthor({ dni: '', nombre: '', apellido: '', fecha_nacimiento: '' });  // Reiniciamos el formulario
            } else {
                // Si la respuesta no es exitosa, mostramos el mensaje de error
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error adding author:', error);  // Mostramos errores en consola si ocurren
        }
    };

    // Función para eliminar un autor mediante una solicitud DELETE
    const handleDeleteAuthor = async (dni) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este autor?')) {
            try {
                // Realizamos la solicitud DELETE al servidor
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteAuthor&dni=${dni}`);

                if (response.data.status === 'success') {
                    // Si la eliminación es exitosa, eliminamos el autor de la lista local
                    setAuthors(authors.filter(author => author.dni !== dni));
                } else {
                    // Si la respuesta no es exitosa, mostramos el mensaje de error
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error deleting author:', error);  // Mostramos errores en consola si ocurren
            }
        }
    };

    // Función para editar un autor mediante una solicitud PUT
    const handleEditAuthor = async () => {
        try {
            // Enviamos la solicitud PUT con los nuevos datos del autor
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateAuthor', editAuthor);

            if (response.data.status === 'success') {
                // Si la respuesta es exitosa, actualizamos el autor en la lista
                setAuthors(authors.map(author => (author.dni === editAuthor.dni ? editAuthor : author)));
                setShowEditForm(false);  // Cerramos el formulario de editar
                setEditAuthor(null);  // Reiniciamos el autor en edición
            } else {
                // Si la respuesta no es exitosa, mostramos el mensaje de error
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error updating author:', error);  // Mostramos errores en consola si ocurren
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Autores</h2>
            </div>
            <div className="card-body p-2">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-sm">
                        <thead className="table-light">
                            <tr>
                                <th className="small">DNI</th>
                                <th className="small">Nombre</th>
                                <th className="small">Apellido</th>
                                <th className="small">Fecha de Nacimiento</th>
                                <th className="small">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {authors.map(author => (
                                <tr key={author.dni}>
                                    <td className="small">{author.dni}</td>
                                    <td className="small">{author.nombre}</td>
                                    <td className="small">{author.apellido}</td>
                                    <td className="small">{author.fecha_nacimiento}</td>
                                    <td>
                                        <button
                                            onClick={() => { setEditAuthor(author); setShowEditForm(true); }}
                                            className="btn btn-warning btn-sm me-1">
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteAuthor(author.dni)}
                                            className="btn btn-danger btn-sm">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn btn-success btn-sm">
                    Añadir Autor
                </button>
            </div>

            {/* Formulario para Añadir Autor */}
            {showAddForm && (
                <div className="mt-3">
                    <h3 className="h6">Añadir Autor</h3>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="DNI"
                            value={newAuthor.dni}
                            onChange={e => setNewAuthor({ ...newAuthor, dni: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Nombre"
                            value={newAuthor.nombre}
                            onChange={e => setNewAuthor({ ...newAuthor, nombre: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Apellido"
                            value={newAuthor.apellido}
                            onChange={e => setNewAuthor({ ...newAuthor, apellido: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={newAuthor.fecha_nacimiento}
                            onChange={e => setNewAuthor({ ...newAuthor, fecha_nacimiento: e.target.value })} />
                    </div>
                    <button onClick={handleAddAuthor} className="btn btn-primary btn-sm me-2">Guardar</button>
                    <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                </div>
            )}

            {/* Formulario para Editar Autor */}
            {showEditForm && editAuthor && (
                <div className="mt-3">
                    <h3 className="h6">Editar Autor</h3>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editAuthor.nombre}
                            onChange={e => setEditAuthor({ ...editAuthor, nombre: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={editAuthor.apellido}
                            onChange={e => setEditAuthor({ ...editAuthor, apellido: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <input
                            type="date"
                            className="form-control form-control-sm"
                            value={editAuthor.fecha_nacimiento}
                            onChange={e => setEditAuthor({ ...editAuthor, fecha_nacimiento: e.target.value })} />
                    </div>
                    <button onClick={handleEditAuthor} className="btn btn-primary btn-sm me-2">Guardar Cambios</button>
                    <button onClick={() => setShowEditForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default AuthorTable;