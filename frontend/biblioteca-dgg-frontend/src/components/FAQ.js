import React from 'react';

const FAQ = () => {
  return (
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
  );
};

export default FAQ;
