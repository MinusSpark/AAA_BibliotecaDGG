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

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            {/* Sección de fondo con imagen y estilo */}
            <div
                style={{
                    backgroundImage: `url(${fondoBiblioteca})`,  // Establece la imagen de fondo
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(0px)',  // Sin filtro de desenfoque
                    position: 'relative',
                    color: 'white',
                    textAlign: 'center',
                    padding: '5rem 0',  // Padding para darle espacio a la sección
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Filtro oscuro para mejorar la legibilidad del texto
                        zIndex: 1,
                    }}
                ></div>
                <h1
                    style={{
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    Panel de Usuario
                </h1>
            </div>
            <div className="container-fluid flex-grow-1 my-5">
                <div className="row">
                    {/* Sección de préstamos actuales */}
                    <div className="col-12 col-md-6 mb-4">
                        <h3 className="text-primary">Libros Actuales Prestados ({currentLoans.length}/10)</h3>
                        {currentLoans.length > 0 ? (
                            <ul className="list-group">
                                {currentLoans.map((loan, index) => (
                                    <li key={`${loan.isbn}-${index}`} className="list-group-item">
                                        <strong>{loan.titulo}</strong> <br />
                                        <small className="text-muted">
                                            Fecha de Préstamo: {loan.fecha_prestamo} <br />
                                            Tiempo Restante: {loan.dias_restantes}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No tienes libros prestados actualmente.
                            </div>
                        )}
                    </div>

                    {/* Sección de historial de préstamos */}
                    <div className="col-12 col-md-6 mb-4">
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

                    {/* Sección de reservas pendientes */}
                    <div className="col-12 col-md-6 mb-4">
                        <h3>Reservas Pendientes ({pendingReservations.length}/3)</h3>
                        {pendingReservations.length > 0 ? (
                            <ul className="list-group">
                                {pendingReservations.map((reservation, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>{reservation.titulo}</strong> <br />
                                        <small>
                                            Tiempo Restante: {reservation.tiempo_restante === "Expirada" ? (
                                                <span className="text-danger">Expirada</span>
                                            ) : (
                                                <span className="text-success">{reservation.tiempo_restante}</span>
                                            )}
                                        </small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No tienes reservas pendientes.
                            </div>
                        )}
                    </div>

                    {/* Sección de lista de espera */}
                    <div className="col-12 col-md-6 mb-4">
                        <h3>Lista de Espera</h3>
                        {waitingList.length > 0 ? (
                            <ul className="list-group">
                                {waitingList.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        <strong>{item.titulo}</strong> <br />
                                        <small>Fecha de Registro: {item.fecha_registro}</small>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="alert alert-info" role="alert">
                                No estás en ninguna lista de espera.
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
