import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import UserPanel from './pages/UserPanel';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin-panel" element={<AdminPanel />} />
                <Route path="/user-panel" element={<UserPanel />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </Router>
    );
}

export default App;
