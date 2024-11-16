import React, { useState } from 'react';
import axios from 'axios';

const PublisherTable = ({ publishers, setPublishers }) => {
    const [newPublisher, setNewPublisher] = useState({ nombre: '', telefono: '', direccion: '', fecha_nacimiento: '' });
    const [editPublisher, setEditPublisher] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleAddPublisher = async () => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=addPublisher', newPublisher);
            if (response.data.status === 'success') {
                setPublishers([...publishers, newPublisher]);
                setShowAddForm(false);
                setNewPublisher({ nombre: '', telefono: '', direccion: '', fecha_nacimiento: '' });
            }
        } catch (error) {
            console.error('Error adding publisher:', error);
        }
    };

    const handleDeletePublisher = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta editorial?')) {
            try {
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deletePublisher&id=${id}`);
                if (response.data.status === 'success') {
                    setPublishers(publishers.filter(publisher => publisher.id !== id));
                }
            } catch (error) {
                console.error('Error deleting publisher:', error);
            }
        }
    };

    const handleEditPublisher = async () => {
        try {
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updatePublisher', editPublisher);
            if (response.data.status === 'success') {
                setPublishers(publishers.map(publisher => (publisher.id === editPublisher.id ? editPublisher : publisher)));
                setShowEditForm(false);
                setEditPublisher(null);
            }
        } catch (error) {
            console.error('Error updating publisher:', error);
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Editoriales</h2>
            </div>
            <div className="card-body p-2">
                <table className="table table-bordered table-sm">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center">ID</th>
                            <th>Nombre</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Fecha de Nacimiento</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {publishers.map(publisher => (
                            <tr key={publisher.id}>
                                <td className="text-center">{publisher.id}</td>
                                <td>{publisher.nombre}</td>
                                <td>{publisher.telefono}</td>
                                <td>{publisher.direccion}</td>
                                <td>{publisher.fecha_nacimiento}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => { setEditPublisher(publisher); setShowEditForm(true); }}
                                        className="btn btn-warning btn-sm me-1">
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeletePublisher(publisher.id)}
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
                    Añadir Editorial
                </button>
            </div>

            {/* Formulario para Añadir Editorial */}
            {showAddForm && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-success text-white p-1">
                        <h3 className="h6 mb-0">Añadir Editorial</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nombre"
                            value={newPublisher.nombre}
                            onChange={e => setNewPublisher({ ...newPublisher, nombre: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Teléfono"
                            value={newPublisher.telefono}
                            onChange={e => setNewPublisher({ ...newPublisher, telefono: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Dirección"
                            value={newPublisher.direccion}
                            onChange={e => setNewPublisher({ ...newPublisher, direccion: e.target.value })} />
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={newPublisher.fecha_nacimiento}
                            onChange={e => setNewPublisher({ ...newPublisher, fecha_nacimiento: e.target.value })} />
                        <button onClick={handleAddPublisher} className="btn btn-primary btn-sm me-2">Guardar</button>
                        <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}

            {/* Formulario para Editar Editorial */}
            {showEditForm && editPublisher && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-warning text-white p-1">
                        <h3 className="h6 mb-0">Editar Editorial</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editPublisher.nombre}
                            onChange={e => setEditPublisher({ ...editPublisher, nombre: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editPublisher.telefono}
                            onChange={e => setEditPublisher({ ...editPublisher, telefono: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editPublisher.direccion}
                            onChange={e => setEditPublisher({ ...editPublisher, direccion: e.target.value })} />
                        <input
                            type="date"
                            className="form-control mb-2"
                            value={editPublisher.fecha_nacimiento}
                            onChange={e => setEditPublisher({ ...editPublisher, fecha_nacimiento: e.target.value })} />
                        <button onClick={handleEditPublisher} className="btn btn-primary btn-sm me-2">Guardar Cambios</button>
                        <button onClick={() => setShowEditForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PublisherTable;
