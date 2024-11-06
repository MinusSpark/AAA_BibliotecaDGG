import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4">
            <div className="container">
                <p className="mb-0">Biblioteca DGG © 2024</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/privacy" className="text-white">Política de Privacidad</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/terms" className="text-white">Términos de Servicio</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
