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

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

