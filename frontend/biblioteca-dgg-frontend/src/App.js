import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import UserPanel from './pages/UserPanel';
import AdminPanel from './pages/AdminPanel';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/user-panel" element={<UserPanel />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
            </Routes>
        </Router>
    );
};

export default App;
