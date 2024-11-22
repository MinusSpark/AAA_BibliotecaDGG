import React, { useState } from 'react';
import axios from 'axios';

const UserTable = ({ users, setUsers }) => {
    const [newUser, setNewUser] = useState({ dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: '' });
    const [editUser, setEditUser] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser', newUser);
            if (response.data.status === 'success') {
                setUsers([...users, newUser]);
                setShowAddForm(false);
                setNewUser({ dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: '' });
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (dni) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteUser&dni=${dni}`);
                if (response.data.status === 'success') {
                    setUsers(users.filter(user => user.dni !== dni));
                    alert('Usuario eliminado exitosamente');
                } else {
                    alert('Error: ' + response.data.message);
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Hubo un error al eliminar el usuario.');
            }
        }
    };


    const handleEditUser = async () => {
        try {
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateUser', editUser);
            if (response.data.status === 'success') {
                setUsers(users.map(user => (user.dni === editUser.dni ? editUser : user)));
                setShowEditForm(false);
                setEditUser(null);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="card mb-3 shadow-sm">
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Usuarios Registrados</h2>
            </div>
            <div className="card-body p-2">
                <table className="table table-bordered table-sm">
                    <thead className="table-light">
                        <tr>
                            <th className="text-center">DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.dni}>
                                <td className="text-center">{user.dni}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.correo}</td>
                                <td className="text-center">
                                    <button
                                        onClick={() => { setEditUser(user); setShowEditForm(true); }}
                                        className="btn btn-warning btn-sm me-1">
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(user.dni)}
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
                    Añadir Usuario
                </button>
            </div>

            {/* Formulario para Añadir Usuario */}
            {showAddForm && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-success text-white p-1">
                        <h3 className="h6 mb-0">Añadir Usuario</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="DNI"
                            value={newUser.dni}
                            onChange={(e) => setNewUser({ ...newUser, dni: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nombre"
                            value={newUser.nombre}
                            onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Apellido"
                            value={newUser.apellido}
                            onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Teléfono"
                            value={newUser.telefono}
                            onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })} />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Correo"
                            value={newUser.correo}
                            onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })} />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="Contraseña"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                        <button onClick={handleAddUser} className="btn btn-primary btn-sm me-2">Guardar</button>
                        <button onClick={() => setShowAddForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}

            {/* Formulario para Editar Usuario */}
            {showEditForm && editUser && (
                <div className="card mt-3 p-2">
                    <div className="card-header bg-warning text-white p-1">
                        <h3 className="h6 mb-0">Editar Usuario</h3>
                    </div>
                    <div className="card-body p-2">
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editUser.dni}
                            readOnly />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editUser.nombre}
                            onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editUser.apellido}
                            onChange={(e) => setEditUser({ ...editUser, apellido: e.target.value })} />
                        <input
                            type="text"
                            className="form-control mb-2"
                            value={editUser.telefono}
                            onChange={(e) => setEditUser({ ...editUser, telefono: e.target.value })} />
                        <input
                            type="email"
                            className="form-control mb-2"
                            value={editUser.correo}
                            onChange={(e) => setEditUser({ ...editUser, correo: e.target.value })} />
                        <button onClick={handleEditUser} className="btn btn-primary btn-sm me-2">Guardar Cambios</button>
                        <button onClick={() => setShowEditForm(false)} className="btn btn-secondary btn-sm">Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;
