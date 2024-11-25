import React from 'react';
import fondoBiblioteca from '../images/fondoBiblioteca.jpg';

const TitleBanner = () => {
  return (
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
  );
};

export default TitleBanner;
