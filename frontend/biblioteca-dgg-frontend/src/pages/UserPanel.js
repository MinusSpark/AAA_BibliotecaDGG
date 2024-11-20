import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserPanel = () => {
    const { user } = useContext(AuthContext);
    const [currentLoans, setCurrentLoans] = useState([]);
    const [loanHistory, setLoanHistory] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);

    // Obtener préstamos actuales
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=currentLoans&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setCurrentLoans(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching current loans:', error);
            }
        };

        const fetchLoanHistory = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=loanHistory&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setLoanHistory(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching loan history:', error);
            }
        };
        const fetchPendingReservations = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=pendingReservationsUsuario&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setPendingReservations(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching pending reservations:', error);
            }
        };

        fetchPendingReservations();
        fetchLoans();
        fetchLoanHistory();
    }, [user.dni]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container flex-grow-1 my-5">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="text-center mb-4">Panel de Usuario</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="text-primary">Libros Actuales Prestados</h3>
                        {currentLoans.length > 0 ? (
                            <ul className="list-group">
                                {currentLoans.map((loan, index) => (
                                    <li key={`${loan.isbn}-${index}`} className="list-group-item">
                                        <strong>{loan.titulo}</strong> <br />
                                        <small className="text-muted">Fecha de Préstamo: {loan.fecha_prestamo}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No tienes libros prestados actualmente.
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-secondary">Historial de Préstamos</h3>
                        {loanHistory.length > 0 ? (
                            <ul className="list-group">
                                {loanHistory.map((loan, index) => (
                                    <li key={`${loan.isbn}-${loan.fecha_prestamo}-${index}`} className="list-group-item">
                                        <strong>{loan.titulo}</strong> <br />
                                        <small className="text-muted">
                                            Fecha de Préstamo: {loan.fecha_prestamo} <br />
                                            Fecha de Devolución: {loan.fecha_devolucion}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No tienes historial de préstamos.
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-info">Reservas Pendientes</h3>
                        {pendingReservations.length > 0 ? (
                            <ul className="list-group">
                                {pendingReservations.map((reservation, index) => (
                                    <li key={`${reservation.isbn}-${index}`} className="list-group-item">
                                        <strong>{reservation.titulo}</strong> <br />
                                        <small className="text-muted">Fecha de Reserva: {reservation.fecha_reserva}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No tienes reservas pendientes.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserPanel;
