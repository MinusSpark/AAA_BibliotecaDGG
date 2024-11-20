import axios from 'axios';

const ReservationsTable = ({ reservations, setReservations, setBorrowedBooks }) => {

    const approveReservation = async (reservationId) => {
        try {
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=convertReservation', {
                reservationId: reservationId
            });

            if (response.data.status === 'success') {
                alert('Reserva aprobada y convertida en préstamo exitosamente.');
                const newBorrowedBook = response.data.borrowedBook;

                // Actualizar estado de las reservas y libros prestados
                setReservations(prevReservations => prevReservations.filter(res => res.id !== reservationId));
                setBorrowedBooks(prevBorrowedBooks => [...prevBorrowedBooks, newBorrowedBook]);
            } else {
                alert(`Error al aprobar la reserva: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error al aprobar la reserva:', error);
            alert('Hubo un problema al procesar la solicitud.');
        }
    };

    return (
        <div className='card mb-3 shadow-sm'>
            <div className="card-header bg-primary text-white p-2">
                <h2 className="h6 mb-0">Reservas Pendientes</h2>
            </div>
            <div className="card-body p-2">
                <table className="table table-bordered table-sm">
                    <thead className='table-light'>
                        <tr>
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Usuario DNI</th>
                            <th className='text-center'>Libro ISBN</th>
                            <th className='text-center'>Fecha Reserva</th>
                            <th className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.usuario_dni}</td>
                                <td>{reservation.libro_isbn}</td>
                                <td>{new Date(reservation.fecha_reserva).toLocaleString()}</td>
                                <td className='text-center'>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => approveReservation(reservation.id)}
                                    >
                                        Aprobar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReservationsTable;
