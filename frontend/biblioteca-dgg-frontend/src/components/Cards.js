import React from 'react';
import prestamoLibros from '../images/prestamoLibros.jpg';
import salaEstudio from '../images/salaEstudio.jpg';
import personaLeyendo from '../images/personaLeyendo.jpg';

const Cards = () => {
  return (
    <div className="container my-4">
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
  );
};

export default Cards;
