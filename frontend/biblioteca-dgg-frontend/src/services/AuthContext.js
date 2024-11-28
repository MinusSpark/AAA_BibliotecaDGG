import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error al parsear el usuario:', error);
                localStorage.removeItem('user'); // Elimina el valor incorrecto si ocurre un error al parsear
            }
        }
    }, []);

    const login = async (email, password, isAdmin = false) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=login', { email, password });
            const userData = response.data.user; // Asegúrate de que esto sea correcto
            console.log('Usuario logueado:', userData); // Agrega esto para verificar la estructura
            if (isAdmin) {
                setUser({ ...userData, role: 'admin' }); // Agregar rol
            } else {
                setUser(userData);
            }
            localStorage.setItem('user', JSON.stringify(userData));
            return { status: 'success', user: userData }; // Devolver la respuesta
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return { status: 'error', message: error.message }; // Devolver error
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=getEvents');
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener eventos:', error);
            return [];
        }
    };

    const addEvent = async (fecha, descripcion, max_asistentes) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=addEvent', {
                fecha,
                descripcion,
                max_asistentes
            });
            return response.data;
        } catch (error) {
            console.error('Error al añadir evento:', error);
            return { status: 'error', message: error.message };
        }
    };

    const deleteEvent = async (id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=deleteEvent', { id });
            return response.data;
        } catch (error) {
            console.error('Error al borrar evento:', error);
            return { status: 'error', message: error.message };
        }
    };

    const inscribirUsuario = async (evento_id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=inscribirUsuario', {
                evento_id,
                dni: user.dni,
                correo: user.correo,
            });
            return response.data;
        } catch (error) {
            console.error('Error al inscribir usuario:', error);
            return { status: 'error', message: error.message };
        }
    };

    const desinscribirUsuario = async (evento_id) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=desinscribirUsuario', {
                evento_id,
                dni: user.dni,
                correo: user.correo,
            });
            return response.data;
        } catch (error) {
            console.error('Error al desinscribir usuario:', error);
            return { status: 'error', message: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, getEvents, addEvent, deleteEvent, inscribirUsuario, desinscribirUsuario }}>
            {children}
        </AuthContext.Provider>
    );
};
