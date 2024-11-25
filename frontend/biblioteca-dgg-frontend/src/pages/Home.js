import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import carousel1 from '../images/carousel1.jpg';
import carousel2 from '../images/carousel2.jpg';
import carousel3 from '../images/carousel3.jpg';
import prestamoLibros from '../images/prestamoLibros.jpg';
import salaEstudio from '../images/salaEstudio.jpg';
import personaLeyendo from '../images/personaLeyendo.jpg';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
import { Book } from 'react-bootstrap-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CookieConsent from '../components/CookieConsent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ fecha: '', descripcion: '' });
  const [counter, setCounter] = useState(0);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const { user, getEvents, addEvent, deleteEvent } = useContext(AuthContext);
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
    console.log('Datos del nuevo evento:', newEvent); // Verifica los datos antes de enviar
    const response = await addEvent(newEvent.fecha, newEvent.descripcion);
    console.log('Respuesta del servidor:', response); // Verifica la respuesta del servidor
    if (response.status === 'success') {
        const updatedEvents = await getEvents();
        setEvents(updatedEvents);
        setNewEvent({ fecha: '', descripcion: '' });
    } else {
        alert('Error al añadir evento: ' + response.message);
    }
};


const handleDeleteEvent = async (id) => {
  const response = await deleteEvent(id);
  if (response.status === 'success') {
      const updatedEvents = await getEvents();
      setEvents(updatedEvents || []);
  } else {
      alert('Error al borrar evento: ' + response.message);
  }
};


  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div
        style={{
          backgroundImage: `url(${fondoBiblioteca})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(0px)',
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          padding: '5rem 0',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        <h1
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          Bienvenido a la Biblioteca DGG
        </h1>

        <h4
          style={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          Un Mundo de Conocimiento a tu Alcance
        </h4>
      </div>

      <Carousel className="my-4" style={{ maxWidth: '750px', margin: '0 auto' }}>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel1} alt="Primera imagen" />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-4">
            <h3 className="text-light">Explora Nuestros Libros</h3>
            <p className="text-light">Encuentra una gran variedad de títulos y categorías.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel2} alt="Segunda imagen" />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-4">
            <h3 className="text-light">Gestiona tu Biblioteca</h3>
            <p className="text-light">Accede a préstamos y devoluciones fácilmente.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={carousel3} alt="Tercera imagen" />
          <Carousel.Caption className="bg-dark bg-opacity-50 p-4">
            <h3 className="text-light">Únete Hoy Mismo</h3>
            <p className="text-light">Regístrate y disfruta de nuestros servicios.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

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
                      <p className="card-text">Año: {book.año}</p>
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
                    <h3 class="text text-white">Añadir Evento</h3>
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
                    <button onClick={handleAddEvent} class="mt-2 p-2">Añadir</button>
                  </div>
                )}
                {user && user.role === 'admin' && (
                  <div>
                    <h3 class="text text-white">Eliminar Evento</h3>
                    <ul>
                      {events.map(event => (
                        <li key={event.id} class="text text-white">
                          {event.fecha}: {event.descripcion}
                          <button onClick={() => handleDeleteEvent(event.id)}>Eliminar</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container my-5">
          <h2 className="text-center" style={{ color: '#000000' }}>Servicios de la Biblioteca</h2>
          <div className="row">
            <div className="col-md-4 mb-3 mt-4">
              <div className="card h-100">
                <img src={prestamoLibros} className="card-img-top" alt="Préstamo de Libros" />
                <div className="card-body" style={{ background: '#F5F5F5' }}>
                  <h5 className="card-title">Préstamo de Libros</h5>
                  <p className="card-text">Realiza préstamos de libros y disfruta de lecturas en casa. Disponemos de una amplia variedad de títulos, tanto en formato físico como digital. Si no encuentras lo que buscas, te ayudamos a realizar una búsqueda personalizada.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mt-4">
              <div className="card h-100">
                <img src={salaEstudio} className="card-img-top" alt="Sala de Estudio" />
                <div className="card-body" style={{ background: '#F5F5F5' }}>
                  <h5 className="card-title">Compra tus libros favoritos</h5>
                  <p className="card-text">Disfruta de un espacio tranquilo para estudiar y trabajar. Además de nuestra oferta de libros en préstamo, contamos con una tienda de libros en la que puedes adquirir tus títulos favoritos.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3 mt-4">
              <div className="card h-100">
                <img src={personaLeyendo} className="card-img-top" alt="Lectura Personalizada" />
                <div className="card-body" style={{ background: '#F5F5F5' }}>
                  <h5 className="card-title">Únete a nuestras actividades</h5>
                  <p className="card-text">Contamos con un servicio personalizado para lectores. Además de nuestros préstamos y venta de libros, organizamos actividades como clubes de lectura, talleres de escritura, y eventos con autores invitados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-column" style={{ background: '#F5F5F5', padding: 50, paddingBottom: 80 }}>
        <h2 className="text-center mb-4">Preguntas Frecuentes</h2>
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                ¿Cómo puedo solicitar el préstamo de un libro?
              </button>
            </h2>
            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">Puedes buscar el libro en el catálogo de nuestra página web. Una vez encontrado, inicia sesión y busca el libro que quieres pedir prestado.</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                ¿Cuánto tiempo puedo tener un libro prestado?
              </button>
            </h2>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">El período estándar de préstamo es de 14 días, con posibilidad de una renovación si el libro no está reservado por otro usuario.</div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                ¿Qué hago si pierdo un libro que tengo en préstamo?
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body">Debes comunicarte con la biblioteca lo antes posible. Se te pedirá reemplazar el libro perdido o cubrir su costo según la política de reposición.</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CookieConsent />
    </div>
  );
};

export default Home;
