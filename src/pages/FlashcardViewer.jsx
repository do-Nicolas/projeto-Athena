  import React, { useState } from "react";
  import "./FlashcardViewer.css";
  import { darkenColor } from "../utils/ColorUtils";

  const FlashcardViewer = ({ cards, subject, onExit, user }) => {
    const [index, setIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);

    const card = cards[index];

    if (!card) {
      return <p>Nenhum card encontrado.</p>;
    }

    const sombra = darkenColor(card.color, 60);

    // -----------------------------
    // Ir para o próximo card
    // -----------------------------
    const nextCard = () => {
      setShowBack(false);
      if (index < cards.length - 1) {
        setIndex(index + 1);
      } else {
        onExit(); // terminou a revisão
      }
    };

    // -----------------------------
    // Enviar resposta p/ backend
    // -----------------------------
  const handleReview = async (isCorrect) => {
    const currentCard = cards[index]; // captura o card atual ANTES do React mudar o state
        if (!user) {
      console.error("Erro: user não foi passado para FlashcardViewer");
      return <p>Erro interno: usuário não identificado.</p>;
    }

    if (!currentCard) {
      console.error("Card undefined ao tentar revisar.");
      return;
    }

    try {
      await fetch(`http://localhost:3001/flashcards/${currentCard.id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify({ isCorrect }),
      });

      nextCard();
    } catch (error) {
      console.error("Erro ao enviar revisão:", error);
      alert("Erro ao registrar revisão.");
    }
  };

    return (
      <div className="main-content">
        <div className="flashcard-screen">
          <header className="flashcard-header">
            <h2 style={{ color: subject.color }}>{subject.name}</h2>
          </header>

          <div
            className="flashcard"
            onClick={() => setShowBack(!showBack)}
            style={{
              borderColor: card.color,
              boxShadow: `0 4px 0 ${sombra}`,
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
              <button
                className="flashcard-btn"
                onClick={() => handleReview(false)}
                style={{ backgroundColor: "#F88" }}
              >
                Errado
              </button>

              <button
                className="flashcard-btn"
                onClick={() => handleReview(true)}
                style={{ backgroundColor: "#A6EFFF" }}
              >
                Certo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  export default FlashcardViewer;
