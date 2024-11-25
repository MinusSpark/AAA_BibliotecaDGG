import React from 'react';
import { Carousel } from 'react-bootstrap';
import carousel1 from '../images/carousel1.jpg';
import carousel2 from '../images/carousel2.jpg';
import carousel3 from '../images/carousel3.jpg';

const HomeCarousel = () => {
  return (
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
  );
};

export default HomeCarousel;
