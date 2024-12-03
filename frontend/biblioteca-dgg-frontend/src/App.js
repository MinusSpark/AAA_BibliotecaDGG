import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';
import Search from './pages/Search';
import AdminLogin from './pages/AdminLogin';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Donacion from './pages/Donation';
import NotFound from './pages/Error404'; // Importa el componente NotFound

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user-panel" element={<UserPanel />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/search" element={<Search />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/donacion" element={<Donacion />} />
                <Route path="*" element={<NotFound />} /> {/* Ruta para la página 404 */}
            </Routes>
        </Router>
    );
};

export default App;
