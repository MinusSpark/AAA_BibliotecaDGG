import React, { createContext, useState, useEffect } from 'react'; 
import axios from 'axios';  

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Estado para almacenar la información del usuario autenticado

    // useEffect se ejecuta al montar el componente para verificar si hay un usuario guardado en el localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');  // Obtiene el usuario del localStorage
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));  // Si el usuario existe, lo parsea y lo guarda en el estado
            } catch (error) {
                console.error('Error al parsear el usuario:', error);  // Maneja el error si el valor no es válido
                localStorage.removeItem('user');  // Elimina el valor incorrecto en el localStorage
            }
        }
    }, []);  // Se ejecuta una sola vez al cargar el componente

    // Función para iniciar sesión, recibiendo email, password y un parámetro opcional de administrador
    const login = async (email, password, isAdmin = false) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=login', { email, password });
            const userData = response.data.user;  // Obtiene los datos del usuario desde la respuesta
            console.log('Usuario logueado:', userData);  // Verifica la estructura del usuario
            if (isAdmin) {
                setUser({ ...userData, role: 'admin' });  // Si es administrador, se le asigna el rol de admin
            } else {
                setUser(userData);  // Si no es admin, se guarda solo la información del usuario
            }
            localStorage.setItem('user', JSON.stringify(userData));  // Guarda el usuario en el localStorage
            return { status: 'success', user: userData };  // Devuelve el estado de éxito con los datos del usuario
        } catch (error) {
            console.error('Error al iniciar sesión:', error);  // Maneja cualquier error en el login
            return { status: 'error', message: error.message };  // Devuelve el error si ocurre algún problema
        }
    };

    // Función para cerrar sesión y eliminar los datos del usuario
    const logout = () => {
        setUser(null);  // Resetea el estado de usuario
        localStorage.removeItem('user');  // Elimina el usuario del localStorage
    };

    // Función para obtener los eventos registrados en la aplicación
    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=getEvents');
            return response.data.data;  // Devuelve los eventos obtenidos
        } catch (error) {
            console.error('Error al obtener eventos:', error);  // Maneja el error si no se pueden obtener eventos
            return [];  // Devuelve un array vacío en caso de error
        }
    };

    // Función para agregar un nuevo evento
    const addEvent = async (fecha, descripcion, max_asistentes) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=addEvent', {
                fecha,
                descripcion,
                max_asistentes
            });
            return response.data;  // Devuelve la respuesta del servidor
        } catch (error) {
            console.error('Error al añadir evento:', error);  // Maneja cualquier error al agregar el evento
            return { status: 'error', message: error.message };  // Devuelve un error si ocurre algún problema
        }
    };

    // Función para eliminar un evento
    const deleteEvent = async (id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteEvent', { id });
            return response.data;  // Devuelve la respuesta después de eliminar el evento
        } catch (error) {
            console.error('Error al borrar evento:', error);  // Maneja el error al eliminar el evento
            return { status: 'error', message: error.message };  // Devuelve un error si ocurre algún problema
        }
    };

    // Función para inscribir a un usuario a un evento
    const inscribirUsuario = async (evento_id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=inscribirUsuario', {
                evento_id,
                dni: user.dni,  // Se utiliza el DNI y correo del usuario actual
                correo: user.correo,
            });
            return response.data;  // Devuelve la respuesta del servidor
        } catch (error) {
            console.error('Error al inscribir usuario:', error);  // Maneja el error al inscribir al usuario
            return { status: 'error', message: error.message };  // Devuelve un error si ocurre algún problema
        }
    };

    // Función para desinscribir a un usuario de un evento
    const desinscribirUsuario = async (evento_id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=desinscribirUsuario', {
                evento_id,
                dni: user.dni,  // Se utiliza el DNI y correo del usuario actual
                correo: user.correo,
            });
            return response.data;  // Devuelve la respuesta del servidor
        } catch (error) {
            console.error('Error al desinscribir usuario:', error);  // Maneja el error al desinscribir al usuario
            return { status: 'error', message: error.message };  // Devuelve un error si ocurre algún problema
        }
    };

    // Proveedor del contexto que permitirá acceder a los valores de usuario y las funciones desde cualquier componente hijo
    return (
        <AuthContext.Provider value={{ user, login, logout, getEvents, addEvent, deleteEvent, inscribirUsuario, desinscribirUsuario }}>
            {children} 
        </AuthContext.Provider>
    );
};
