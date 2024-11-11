import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import carousel1 from '../images/carousel1.jpg';
import carousel2 from '../images/carousel2.jpg';
import carousel3 from '../images/carousel3.jpg';
import axios from 'axios';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost/AAA_BibliotecaDGG/backend/api.php?request=books');
                setBooks(response.data.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks(); // Llama a la función para obtener los libros
    }, []);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />

            {/* Slider de Bootstrap */}
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
                <h1 className="display-4">Bienvenido a la Biblioteca DGG</h1>
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
                                    <div className="card" style={{ height: '475px' }}>
                                        <img
                                            src={book.portada}
                                            className="card-img-top"
                                            alt={`Portada de ${book.titulo}`}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
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

            </div>

            {/* Sección de Información Adicional */}
            <div className="container my-5">
                <h2 className="text-center">¿Por qué elegirnos?</h2>
                <p className="text-center">Nuestra biblioteca ofrece una amplia gama de servicios para satisfacer tus necesidades de lectura y aprendizaje.</p>
                <div className="row">
                    <div className="col-md-4">
                        <h4>Variedad de Libros</h4>
                        <p>Desde ficción hasta no ficción, tenemos libros para todos los gustos.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Acceso Fácil</h4>
                        <p>Gestiona tus préstamos y devoluciones de manera sencilla y rápida.</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Comunidad Activa</h4>
                        <p>Únete a nuestra comunidad de lectores y participa en eventos y actividades.</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
