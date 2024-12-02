import React, { useState } from 'react'; 
import axios from 'axios';

const UserTable = ({ users, setUsers }) => {
    // Estado para almacenar los datos de un nuevo usuario
    const [newUser, setNewUser] = useState({ dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: '' });
    
    // Estado para almacenar los datos del usuario que se va a editar
    const [editUser, setEditUser] = useState(null);

    // Estados para mostrar u ocultar los formularios de agregar o editar
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    // Función para agregar un nuevo usuario
    const handleAddUser = async () => {
        try {
            // Se envía una solicitud POST para agregar el usuario
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=registerUser', newUser);
            
            if (response.data.status === 'success') {
                // Si la respuesta es exitosa, se actualiza el estado de los usuarios
                setUsers([...users, newUser]);

                // Se oculta el formulario de agregar usuario y se restablecen los campos
                setShowAddForm(false);
                setNewUser({ dni: '', nombre: '', apellido: '', telefono: '', correo: '', password: '' });
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Función para eliminar un usuario por su DNI
    const handleDeleteUser = async (dni) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            try {
                // Se envía una solicitud DELETE para eliminar el usuario
                const response = await axios.delete(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteUser&dni=${dni}`);
                
                if (response.data.status === 'success') {
                    // Si la respuesta es exitosa, se actualiza la lista de usuarios
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

    // Función para editar los datos de un usuario
    const handleEditUser = async () => {
        try {
            // Se envía una solicitud PUT para actualizar los datos del usuario
            const response = await axios.put('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=updateUser', editUser);
            
            if (response.data.status === 'success') {
                // Si la respuesta es exitosa, se actualiza el estado de los usuarios
                setUsers(users.map(user => (user.dni === editUser.dni ? editUser : user)));

                // Se oculta el formulario de edición y se restablece el usuario a editar
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
                            {/* Encabezados de la tabla */}
                            <th className="text-center">DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapea los usuarios y muestra una fila por cada uno */}
                        {users.map(user => (
                            <tr key={user.dni}>
                                <td className="text-center">{user.dni}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.correo}</td>
                                <td className="text-center">
                                    {/* Botón para editar usuario */}
                                    <button
                                        onClick={() => { setEditUser(user); setShowEditForm(true); }}
                                        className="btn btn-warning btn-sm me-1">
                                        Editar
                                    </button>
                                    {/* Botón para eliminar usuario */}
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
                {/* Botón para mostrar el formulario de agregar usuario */}
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
                        {/* Campos del formulario para agregar un usuario */}
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
                        {/* Campos del formulario para editar usuario */}
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
