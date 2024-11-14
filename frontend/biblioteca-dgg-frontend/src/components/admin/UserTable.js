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
                }
            } catch (error) {
                console.error('Error deleting user:', error);
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
        <div className="card mb-4 shadow-sm">
            <div className="card-header bg-success text-white">
                <h2 className="h5 mb-0">Usuarios Registrados</h2>
            </div>
            <div className="card-body">
                <table className="table table-bordered table-striped">
                    <thead className="table-light">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.dni}>
                                <td>{user.dni}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <button onClick={() => { setEditUser(user); setShowEditForm(true); }} className="btn btn-warning">Editar</button>
                                    <button onClick={() => handleDeleteUser(user.dni)} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() => setShowAddForm(true)} className="btn btn-success">Añadir Usuario</button>
                {/* Formulario para Añadir Usuario */}
                {showAddForm && (
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h5 mb-0">Añadir Usuario</h2>
                        </div>
                        <div className="card-body">
                            <input type="text" placeholder="DNI" value={newUser.dni} onChange={(e) => setNewUser({ ...newUser, dni: e.target.value })} />
                            <input type="text" placeholder="Nombre" value={newUser.nombre} onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })} />
                            <input type="text" placeholder="Apellido" value={newUser.apellido} onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })} />
                            <input type="text" placeholder="Teléfono" value={newUser.telefono} onChange={(e) => setNewUser({ ...newUser, telefono: e.target.value })} />
                            <input type="email" placeholder="Correo" value={newUser.correo} onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })} />
                            <input type="password" placeholder="Contraseña" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                            <button onClick={handleAddUser} className="btn btn-primary">Guardar</button>
                            <button onClick={() => setShowAddForm(false)} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                )}

                {/* Formulario para Editar Usuario */}
                {showEditForm && editUser && (
                    <div className="card mb-4 shadow-sm">
                        <div className="card-header bg-warning text-white">
                            <h2 className="h5 mb-0">Editar Usuario</h2>
                        </div>
                        <div className="card-body">
                            <input type="text" placeholder="DNI" value={editUser.dni} readOnly />
                            <input type="text" placeholder="Nombre" value={editUser.nombre} onChange={(e) => setEditUser({ ...editUser, nombre: e.target.value })} />
                            <input type="text" placeholder="Apellido" value={editUser.apellido} onChange={(e) => setEditUser({ ...editUser, apellido: e.target.value })} />
                            <input type="text" placeholder="Teléfono" value={editUser.telefono} onChange={(e) => setEditUser({ ...editUser, telefono: e.target.value })} />
                            <input type="email" placeholder="Correo" value={editUser.correo} onChange={(e) => setEditUser({ ...editUser, correo: e.target.value })} />
                            <button onClick={handleEditUser} className="btn btn-primary">Guardar Cambios</button>
                            <button onClick={() => setShowEditForm(false)} className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserTable;
