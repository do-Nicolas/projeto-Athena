import React, { useState } from "react";
import "./FlashcardViewer.css";
import { darkenColor } from "../utils/ColorUtils";

const FlashcardViewer = ({ cards, subject, onExit }) => {
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

 
  const card = cards[index];

  if (!card) {
    return <p>Nenhum card encontrado.</p>;
  }
 const sombra = darkenColor(card.color, 60);
  const nextCard = () => {
    setShowBack(false);
    if (index < cards.length - 1) {
      setIndex(index + 1);
    } else {
      onExit(); // terminou o deck
    }
  };

  return (
    <div classname ="main-content">
    <div className="flashcard-screen">
      <header className="flashcard-header">
        <h2 style={{ color: subject.color }}>{subject.name}</h2>
      </header>

      <div
        className="flashcard"
        onClick={() => setShowBack(!showBack)}
        style={{
          borderColor: card.color,
          boxShadow: `0 4px 0 ${sombra}`
        }}
      >
        <p className="flashcard-text">
          {showBack ? card.back : card.front}
        </p>
        {!showBack && (
          <span className="flashcard-tap">Clique para ver a resposta</span>
        )}
      </div>

      {showBack && (
        <div className="flashcard-buttons">
          {["Errado", "Certo"].map((btn) => (
            <button
              key={btn}
              className="flashcard-btn"
              onClick={nextCard}
              style={{
                        backgroundColor: '#A6EFFF',
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default FlashcardViewer;
