import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import { Book } from 'react-bootstrap-icons';
import axios from 'axios';
import CookieConsent from '../components/CookieConsent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import HomeCarousel from '../components/Carousel';
import Cards from '../components/Cards';
import FAQ from '../components/FAQ';
import TitleBanner from '../components/TitleBanner';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ fecha: '', descripcion: '', max_asistentes: 0 });
  const [counter, setCounter] = useState(0);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { user, getEvents, addEvent, deleteEvent, inscribirUsuario, desinscribirUsuario } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const welcomeCookie = localStorage.getItem("welcomeMessageShown");
    if (!welcomeCookie) {
      setShowWelcomeMessage(true);
      localStorage.setItem("welcomeMessageShown", "true");
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();

    const fetchEvents = async () => {
      const eventsData = await getEvents();
      setEvents(eventsData || []);
    };
    fetchEvents();

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 4) {
          return prevCounter + 1;
        } else {
          clearInterval(interval);
          return prevCounter;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [getEvents]);

  const handleReservation = async (isbn) => {
    if (!user) {
      navigate('/login');
    } else {
      try {
        const response = await axios.post(
          'http://localhost/AAA_BibliotecaDGG/backend/api.php?request=reserveBook',
          { dni: user.dni, isbn }
        );
        if (response.data.status === 'success') {
          alert('Reserva realizada con éxito.');
        } else {
          alert('Error al realizar la reserva: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error realizando la reserva:', error);
        alert('Error al realizar la reserva.');
      }
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await addEvent(newEvent.fecha, newEvent.descripcion, newEvent.max_asistentes);
      if (response.status === 'success') {
        alert(response.message);
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
        setNewEvent({ fecha: '', descripcion: '', max_asistentes: 0 });
      } else {
        alert('Error al añadir evento: ' + response.message);
      }
    } catch (error) {
      console.error('Error al añadir evento:', error);
      alert('Error al añadir evento.');
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await deleteEvent(id);
      if (response.status === 'success') {
        alert(response.message);
        const updatedEvents = await getEvents();
        setEvents(updatedEvents || []);
      } else {
        alert('Error al borrar evento: ' + response.message);
      }
    } catch (error) {
      console.error('Error al borrar evento:', error);
      alert('Error al borrar evento.');
    }
  };

  const handleSignup = async (eventoId) => {
    if (!user) {
      navigate('/login');
    } else {
      try {
        const response = await axios.post('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=inscribirUsuario', {
          evento_id: eventoId,
          dni: user.dni,
          correo: user.correo,
        });
        if (response.data.status === 'success') {
          alert('Inscripción realizada con éxito.');
          const updatedEvents = await getEvents();
          setEvents(updatedEvents);
        } else if (response.data.message === 'Ya estás inscrito a este evento') {
          alert('Ya estás inscrito a este evento');
        } else {
          alert('Error al realizar la inscripción: ' + response.data.message);
        }
      } catch (error) {
        console.error('Error realizando la inscripción:', error);
        alert('Error al realizar la inscripción.');
      }
    }
  };

  const handleUnsubscribe = async (eventoId) => {
    try {
      const response = await desinscribirUsuario(eventoId);
      if (response.status === 'success') {
        alert(response.message);
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
      } else if (response.message === 'No estás inscrito a este evento.') {
        alert('No estás inscrito a este evento.');
      } else {
        alert('Error al realizar la desinscripción: ' + response.message);
      }
    } catch (error) {
      console.error('Error realizando la desinscripción:', error);
      alert('Error al realizar la desinscripción.');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <TitleBanner />

      <HomeCarousel />

      <div className="container text-center my-5">
        <p className="lead">Explora nuestra colección de libros y gestiona tus préstamos.</p>

        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-success text-white">
            <h2 className="h5 mb-0">Libros Disponibles</h2>
          </div>
          <div className="card-body">
            <div className="row">
              {books.map(book => (
                <div className="col-md-2 mb-3" key={book.isbn}>
                  <div className="card" style={{ height: '575px' }}>
                    <img src={book.portada} className="card-img-top" alt={`Portada de ${book.titulo}`} style={{ height: '300px', objectFit: 'cover' }} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{book.titulo}</h5>
                      <p className="card-text">Autor: {book.autor_nombre} {book.autor_apellido}</p>
                      <p className="card-text">Año: {book.anio}</p>
                      <p className="card-text">Stock: {book.stock}</p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => handleReservation(book.isbn)}
                        >
                          Reservar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row d-flex flex-row">
            <div className="texto d-flex flex-column col-md-6 col-xxl-6 p-4" style={{ background: '#f7f7f7' }}>
              <h4 className="mb-3" style={{ color: '#FFC300' }}>Encontrarás un montón de posibilidades</h4>
              <p>En la Biblioteca DGG no solo encontrarás libros, sino también un espacio vibrante lleno de actividades que enriquecerán tu experiencia como lector y miembro de nuestra comunidad. Te invitamos a que te sumes a nuestros Eventos Destacados, diseñados para inspirarte, conectar con otros y ampliar tus conocimientos de forma divertida y significativa.</p>
              <div className="d-flex align-items-center justify-content-center text-center">
                <div className="me-2">
                  <h2>{counter}+</h2>
                  <p className="text-center">Actividades Mensuales</p>
                </div>
                <div>
                  <Book size={48} />
                </div>
              </div>
            </div>

            <div className="calendario col-xxl-6 col-md-6 d-flex justify-content-center align-items-center p-4" style={{ background: '#002B5B' }}>
              <div className="calendar-container">
                <h4 className="mb-3" style={{ color: '#FFFFFF' }}>Eventos Destacados</h4>
                <Calendar
                  style={{ backgroundColor: '#F5F5F5' }}
                  tileContent={({ date, view }) => {
                    const event = events.find(event => new Date(event.fecha).toDateString() === date.toDateString());
                    return event ? <p>{event.descripcion}</p> : null;
                  }}
                />
                {user && user.role === 'admin' && (
                  <div>
                    <h3 className="text text-white">Añadir Evento</h3>
                    <input
                      type="date"
                      value={newEvent.fecha}
                      onChange={(e) => setNewEvent({ ...newEvent, fecha: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Descripción"
                      value={newEvent.descripcion}
                      onChange={(e) => setNewEvent({ ...newEvent, descripcion: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Máximo de asistentes"
                      value={newEvent.max_asistentes}
                      onChange={(e) => setNewEvent({ ...newEvent, max_asistentes: parseInt(e.target.value) })}
                    />
                    <button onClick={handleAddEvent} className="mt-2 p-2">Añadir</button>
                  </div>
                )}
                {events.map(event => (
                  <div key={event.id}>
                    <p class="text-white mt-3">{event.fecha}: {event.descripcion} - Asistentes: {event.asistentes_actuales}/{event.max_asistentes}</p>
                    {user && user.role !== 'admin' && (
                      <>
                        <button onClick={() => handleSignup(event.id)} disabled={event.asistentes_actuales >= event.max_asistentes}>
                          Inscribirse
                        </button>
                        <button onClick={() => handleUnsubscribe(event.id)}>
                          Desinscribirse
                        </button>
                      </>
                    )}
                    {user && user.role === 'admin' && (
                      <button onClick={() => handleDeleteEvent(event.id)} className="btn btn-danger ">
                        Eliminar Evento
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Cards />

        <FAQ />

      </div>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Home;
