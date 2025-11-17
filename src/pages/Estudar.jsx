import React from 'react';
import './Estudar.css';
import { darkenColor } from '../utils/ColorUtils'; // IMPORTOU A FUNÇÃO

const decks = [
  { nome: "English deck", cor: "#90EBF5" },
  { nome: "Revolução deck", cor: "#d9a886" },
  { nome: "Celulas deck", cor: "#9df86d" },
];

const Estudar = () => {
  return (
    <div className="main-content">
      <h1 className="titulo-dia">Sábado</h1>

      <div className="deck-container">
        {decks.map((deck, index) => {
          const sombra = darkenColor(deck.cor, 60);

          return (
            <div
              key={index}
              className="deck-card"
              style={{
                backgroundColor: deck.cor,
                boxShadow: `0 4px 0 ${sombra}`,
              }}
            >
              <span className="deck-nome">{deck.nome}</span>
              <button
                className="btn-iniciar"
                style={{
                    backgroundColor: deck.cor,
                    boxShadow: `0 6px 0 ${sombra}`, // sombra sólida maior embaixo
                    color: "white",
                }}
                >
                iniciar
                </button>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Estudar;
