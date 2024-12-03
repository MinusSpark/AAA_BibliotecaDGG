import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';

const UserPanel = () => {
    const { user } = useContext(AuthContext);  // Obtiene el usuario actual desde el contexto
    // Estados para almacenar los datos de los préstamos actuales, historial de préstamos, reservas pendientes y lista de espera
    const [currentLoans, setCurrentLoans] = useState([]);
    const [loanHistory, setLoanHistory] = useState([]);
    const [pendingReservations, setPendingReservations] = useState([]);
    const [waitingList, setWaitingList] = useState([]);

    // useEffect para obtener los datos cuando el componente se monta o cuando el DNI del usuario cambia
    useEffect(() => {
        // Función para obtener los préstamos actuales del usuario
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=currentLoans&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    // Verifica si el usuario tiene préstamos vencidos
                    const penalized = response.data.data.some((loan) => parseInt(loan.dias_restantes) < 0);
                    if (penalized) {
                        alert("Tienes préstamos vencidos. Por favor, devuelve los libros lo antes posible.");
                    }
                    setCurrentLoans(response.data.data || []);  // Establece los préstamos actuales
                }
            } catch (error) {
                console.error('Error fetching current loans:', error);  // Muestra un error si no se puede obtener la información
            }
        };

        // Función para obtener el historial de préstamos del usuario
        const fetchLoanHistory = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=loanHistory&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setLoanHistory(response.data.data || []);  // Establece el historial de préstamos
                }
            } catch (error) {
                console.error('Error fetching loan history:', error);  // Muestra un error si no se puede obtener la información
            }
        };

        // Función para obtener las reservas pendientes del usuario
        const fetchPendingReservations = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=pendingReservationsUsuario&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setPendingReservations(response.data.data || []);  // Establece las reservas pendientes
                }
            } catch (error) {
                console.error('Error fetching pending reservations:', error);  // Muestra un error si no se puede obtener la información
            }
        };

        // Función para obtener la lista de espera del usuario
        const fetchWaitingList = async () => {
            try {
                const response = await axios.get(`http://localhost/AAA_BibliotecaDGG/backend/api.php?request=waitingList&dni=${user.dni}`);
                if (response.data.status === 'success') {
                    setWaitingList(response.data.data || []);  // Establece la lista de espera
                } else {
                    console.error('Error fetching waiting list:', response.data.message);  // Muestra un mensaje si hay un error
                }
            } catch (error) {
                console.error('Error fetching waiting list:', error);  // Muestra un error si no se puede obtener la información
            }
        };

        // Llama a las funciones para obtener los datos
        fetchPendingReservations();
        fetchLoans();
        fetchLoanHistory();
        fetchWaitingList();
    }, [user.dni]);  // Se ejecuta cada vez que el DNI del usuario cambia

    const cancelReservation = async (id) => {
        try {
            const response = await axios.delete('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=cancelReservation', {
                data: { id },
            });

            if (response.data.status === 'success') {
                alert('Reserva cancelada con éxito.');
                // Actualizar el estado para eliminar la reserva cancelada
                setPendingReservations((prev) =>
                    prev.filter((reservation) => reservation.id !== id)
                );
            } else {
                alert('No se pudo cancelar la reserva.');
            }
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            alert('Error al intentar cancelar la reserva.');
        }
    };


    return (
        <div className="d-flex flex-column min-vh-100" style={{ background: '#f0f0f0' }}>
            <Header />

            {/* Sección de fondo con imagen y estilo */}
            <div
                className="position-relative text-center text-white py-5"
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        zIndex: 1,
                    }}
                ></div>
                <h1 className="position-relative z-2 display-4">Panel de Usuario</h1>
            </div>

            <div className="container flex-grow-1 my-5">
                <div className="row g-4">
                    {/* Sección de préstamos actuales */}
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h3 className="text-primary">Libros Actuales Prestados ({currentLoans.length}/10)</h3>
                                {currentLoans.length > 0 ? (
                                    <ul className="list-group mt-3">
                                        {currentLoans.map((loan, index) => (
                                            <li key={`${loan.isbn}-${index}`} className="list-group-item">
                                                <strong>{loan.titulo}</strong>
                                                <br />
                                                <small className="text-muted">
                                                    Fecha de Préstamo: {loan.fecha_prestamo}
                                                    <br />
                                                    Tiempo Restante: {loan.dias_restantes}
                                                </small>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="alert alert-info mt-3" role="alert">
                                        No tienes libros prestados actualmente.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sección de historial de préstamos */}
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h3 className="text-secondary">Historial de Préstamos</h3>
                                {loanHistory.length > 0 ? (
                                    <ul className="list-group mt-3">
                                        {loanHistory.map((loan, index) => (
                                            <li
                                                key={`${loan.isbn}-${loan.fecha_prestamo}-${index}`}
                                                className="list-group-item"
                                            >
                                                <strong>{loan.titulo}</strong>
                                                <br />
                                                <small className="text-muted">
                                                    Fecha de Préstamo: {loan.fecha_prestamo}
                                                    <br />
                                                    Fecha de Devolución: {loan.fecha_devolucion}
                                                </small>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="alert alert-info mt-3" role="alert">
                                        No tienes historial de préstamos.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sección de reservas pendientes */}
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h3>Reservas Pendientes ({pendingReservations.length}/3)</h3>
                                {pendingReservations.length > 0 ? (
                                    <ul className="list-group mt-3">
                                        {pendingReservations.map((reservation, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{reservation.titulo}</strong>
                                                    <br />
                                                    <small>
                                                        Tiempo Restante:{' '}
                                                        {reservation.tiempo_restante === 'Expirada' ? (
                                                            <span className="text-danger">Expirada</span>
                                                        ) : (
                                                            <span className="text-success">{reservation.tiempo_restante}</span>
                                                        )}
                                                    </small>
                                                </div>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => cancelReservation(reservation.id)}
                                                >
                                                    Cancelar
                                                </button>
                                            </li>
                                        ))}

                                    </ul>
                                ) : (
                                    <div className="alert alert-info mt-3" role="alert">
                                        No tienes reservas pendientes.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sección de lista de espera */}
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h3>Lista de Espera</h3>
                                {waitingList.length > 0 ? (
                                    <ul className="list-group mt-3">
                                        {waitingList.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                <strong>{item.titulo}</strong>
                                                <br />
                                                <small>Fecha de Registro: {item.fecha_registro}</small>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="alert alert-info mt-3" role="alert">
                                        No estás en ninguna lista de espera.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );


};

export default UserPanel;
