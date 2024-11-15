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
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';
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
        if (prevCounter < 4) {
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
{/* Contenedor del título con imagen de fondo y estilos en línea */}
<div
  style={{
    backgroundImage: `url(${fondoBiblioteca})`, // Imagen de fondo
    backgroundSize: 'cover', // Ajustar la imagen para que cubra todo el contenedor
    backgroundPosition: 'center', // Centrar la imagen
    backgroundRepeat: 'no-repeat', // Evitar repeticiones
    filter: 'blur(0px)', // Difuminado de la imagen de fondo
    position: 'relative', // Para capas internas
    color: 'white', // Texto en blanco
    textAlign: 'center', // Centrar el texto horizontalmente
    padding: '5rem 0', // Espaciado interno para altura del contenedor
  }}
>
  {/* Capa semitransparente para oscurecer el fondo */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurecimiento semitransparente
      zIndex: 1,
    }}
  ></div>

  {/* Título del texto */}
  <h1
    style={{
      position: 'relative', // Colocar encima de la capa de oscurecimiento
      zIndex: 2, // Asegurar que esté por encima de todo lo demás
    }}
  >
    Bienvenido a la Biblioteca DGG
  </h1>

  <h4
    style={{
      position: 'relative', // Colocar encima de la capa de oscurecimiento
      zIndex: 2, // Asegurar que esté por encima de todo lo demás
    }}
  >
    Un Mundo de Conocimiento a tu Alcance
  </h4>

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


  <div class="container-fluid">
    <div class="row d-flex flex-row">
        <div class="texto d-flex flex-column col-md-6 col-xxl-6 p-4" style={{background:'#f7f7f7'}}>
            <h4 class="mb-3" style={{color:'#FFC300'}}>Encontrarás un montón de posibilidades</h4>
            <p>En la Biblioteca DGG no solo encontrarás libros, sino también un espacio vibrante lleno de actividades que enriquecerán tu experiencia como lector y miembro de nuestra comunidad. Te invitamos a que te sumes a nuestros Eventos Destacados, diseñados para inspirarte, conectar con otros y ampliar tus conocimientos de forma divertida y significativa.</p>
            <div className="d-flex align-items-center justify-content-center text-center">
         
            <div className="me-2">
              <h2>{counter}+</h2> {/* Aquí se muestra el contador */}
              <p class="text-center">Actividades Mensuales</p>
            </div>
            <div>
              <Book size={48} />
            </div>
          </div>
        </div>

        <div class="calendario col-xxl-6 col-md-6 d-flex justify-content-center align-items-center p-4" style={{background:'#002B5B'}}>
            <div class="calendar-container">
                <h4 class="mb-3" style={{color:'#FFFFFF'}}>Eventos Destacados</h4>
                <Calendar style={{backgroundColor: '#F5F5F5'}}/>
            </div>
        </div>
    </div>
</div>



        {/* Sección de Servicios de la Biblioteca */}
        <div className="container my-5">
          <h2 className="text-center" style={{color:'#000000'}}>Servicios de la Biblioteca</h2>
          <div className="row">

            <div className="col-md-4 mb-3 mt-4">
              <div className="card h-100">
                <img src={prestamoLibros} className="card-img-top" alt="Préstamo de Libros" />
                <div className="card-body" style={{background:'#F5F5F5'}}>
                   <h5 className="card-title" style={{color:'#FFFFFF', background:'#002B5B',padding:7,margin:-15}}>Préstamo de Libros</h5>
                  <p className="card-text" style={{color:'#000000', marginTop:20}}>
                    Accede a una amplia colección de libros disponibles para préstamos. Nuestra plataforma te permite encontrar fácilmente títulos de diversos géneros y autores reconocidos. Podrás disfrutar de tus lecturas favoritas desde la comodidad de tu hogar o en nuestras instalaciones.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3  mt-4">
              <div className="card h-100">
                <img src={salaEstudio} className="card-img-top" alt="Salas de Estudio" />
                <div className="card-body" style={{background:'#F5F5F5'}}>
                  <h5 className="card-title" style={{color:'#FFFFFF', background:'#002B5B',padding:7,margin:-15}}>Salas de Estudio</h5>
                  <p className="card-text" style={{color:'#000000', marginTop:20}}>
                    Reserva nuestras salas de estudio para un ambiente tranquilo y cómodo, ideal para estudiar o realizar trabajos en equipo. Contamos con espacios bien equipados, conexión a internet, y el ambiente perfecto para que te puedas concentrar y aprovechar al máximo tu tiempo.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-3  mt-4">
              <div className="card h-100">
                <img src={personaLeyendo} className="card-img-top" alt="Club de Lectura" />
                <div className="card-body" style={{background:'#F5F5F5'}}>
                  <h5 className="card-title" style={{color:'#FFFFFF', background:'#002B5B',padding:7,margin:-15}}>Club de Lectura</h5>
                  <p className="card-text" style={{color:'#000000', marginTop:20}}>
                    Únete a nuestro club de lectura y comparte tus experiencias literarias. Participa en discusiones, conoce a otros amantes de la lectura y disfruta de encuentros enriquecedores donde podrás compartir tus opiniones y descubrir nuevas perspectivas sobre tus libros favoritos.
                  </p>
                </div>
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
