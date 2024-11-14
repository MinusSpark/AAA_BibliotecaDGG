import React, { useEffect, useState } from 'react';
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
import { Book } from 'react-bootstrap-icons'; // Importamos el icono del libro
import axios from 'axios';

// Importar la librería del calendario
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [counter, setCounter] = useState(0); // Estado para el contador

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
        setBooks(response.data.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();

    // Contador que va incrementando de 0 a 10 con un intervalo más lento
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter < 10) {
          return prevCounter + 1;
        } else {
          clearInterval(interval); // Detener el intervalo cuando llegue a 10
          return prevCounter;
        }
      });
    }, 500); // 500ms para incrementar el contador

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* Título dentro de container-fluid con fondo azul */}
      <div className="container-fluid bg-primary text-white text-center py-5">
        <h1>Bienvenido a la Biblioteca DGG</h1>
      </div>

      {/* Carousel */}
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

        {/* Sección de Libros Disponibles */}
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
                        <button className="btn btn-primary me-2">Reservar</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de Servicios de la Biblioteca */}
        <div className="container my-5">
          <h2 className="text-center">Servicios de la Biblioteca</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={prestamoLibros} className="card-img-top" alt="Préstamo de Libros" />
                <div className="card-body">
                  <h5 className="card-title">Préstamo de Libros</h5>
                  <p className="card-text">
                    Accede a una amplia colección de libros disponibles para préstamos. Nuestra plataforma te permite encontrar fácilmente títulos de diversos géneros y autores reconocidos. Podrás disfrutar de tus lecturas favoritas desde la comodidad de tu hogar o en nuestras instalaciones.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={salaEstudio} className="card-img-top" alt="Salas de Estudio" />
                <div className="card-body">
                  <h5 className="card-title">Salas de Estudio</h5>
                  <p className="card-text">
                    Reserva nuestras salas de estudio para un ambiente tranquilo y cómodo, ideal para estudiar o realizar trabajos en equipo. Contamos con espacios bien equipados, conexión a internet, y el ambiente perfecto para que te puedas concentrar y aprovechar al máximo tu tiempo.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <img src={personaLeyendo} className="card-img-top" alt="Club de Lectura" />
                <div className="card-body">
                  <h5 className="card-title">Club de Lectura</h5>
                  <p className="card-text">
                    Únete a nuestro club de lectura y comparte tus experiencias literarias. Participa en discusiones, conoce a otros amantes de la lectura y disfruta de encuentros enriquecedores donde podrás compartir tus opiniones y descubrir nuevas perspectivas sobre tus libros favoritos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor del contador (Ajustado para ocupara todo el ancho) */}
        <div className="w-100 bg-primary text-white py-3 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h2>{counter}+</h2> {/* Aquí se muestra el contador */}
            <p>Libros</p>
          </div>
          <Book size={48} />
        </div>

        {/* Sección de Importancia de Leer */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-warning text-white">
            <h2 className="h5 mb-0">La Importancia de Leer</h2>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Primer contenedor con el texto */}
              <div className="col-md-6 mb-3">
                <h3>¿Por qué leer es importante?</h3>
                <p>
                  Leer es fundamental para el desarrollo intelectual, emocional y cultural. A través de los libros, podemos aprender sobre diferentes perspectivas, culturas y pensamientos. Además, nuestra biblioteca organiza actividades en diferentes fechas que puedes consultar en el calendario a continuación.
                </p>
              </div>

              {/* Segundo contenedor con el calendario */}
              {/* Segundo contenedor con el calendario */}
<div className="col-md-6 mb-3 calendar-container">
  <h4>Consulta el Calendario de Actividades</h4>
  <Calendar />
</div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
