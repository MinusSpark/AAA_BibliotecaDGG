import axios from 'axios';

const ReservationsTable = ({ reservations, setReservations, setBorrowedBooks }) => {

    // Función para aprobar una reserva y convertirla en un préstamo
    const approveReservation = async (reservationId) => {
        try {
            // Enviar una solicitud POST para convertir la reserva en un préstamo
            const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=convertReservation', {
                reservationId: reservationId
            });

            // Si la solicitud fue exitosa, se muestra un mensaje y se actualizan los estados
            if (response.data.status === 'success') {
                alert('Reserva aprobada y convertida en préstamo exitosamente.');
                const newBorrowedBook = response.data.borrowedBook;

                // Actualiza la lista de reservas eliminando la reserva aprobada
                setReservations(prevReservations => prevReservations.filter(res => res.id !== reservationId));

                // Agrega el libro prestado a la lista de libros prestados
                setBorrowedBooks(prevBorrowedBooks => [...prevBorrowedBooks, newBorrowedBook]);
            } else {
                alert(`Error al aprobar la reserva: ${response.data.message}`);
            }
        } catch (error) {
            // Manejo de errores en caso de fallo en la solicitud
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
                            {/* Encabezados de la tabla */}
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Usuario DNI</th>
                            <th className='text-center'>Libro ISBN</th>
                            <th className='text-center'>Fecha Reserva</th>
                            <th className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapea las reservas y muestra cada una en una fila */}
                        {reservations.map(reservation => (
                            <tr key={reservation.id}>
                                <td>{reservation.id}</td>
                                <td>{reservation.usuario_dni}</td>
                                <td>{reservation.libro_isbn}</td>
                                <td>{new Date(reservation.fecha_reserva).toLocaleString()}</td>
                                <td className='text-center'>
                                    {/* Botón para aprobar la reserva y convertirla en un préstamo */}
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
