import React, { useEffect, useState } from "react";
import "./Estudar.css";
import { darkenColor } from "../utils/ColorUtils";
import { useUser } from "@clerk/clerk-react";
import FlashcardViewer from "./FlashcardViewer"; // importe o viewer

const Estudar = () => {
  const { user } = useUser();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // estado de estudo
  const [studying, setStudying] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);

  const diasDaSemana = [
    "Domingo", "Segunda-feira", "Terça-feira",
    "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
  ];

  const hoje = new Date();
  const diaSemana = diasDaSemana[hoje.getDay()];

  // carrega subjects
  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3001/api/subjects", {
      headers: { "x-user-id": user.id }
    })
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar matérias:", err);
        setLoading(false);
      });
  }, [user]);

  // função disparada ao clicar em "Iniciar"
  const iniciarEstudo = async (subject) => {
    setCurrentSubject(subject);
    setCardsLoading(true);

    try {
      const res = await fetch(`http://localhost:3001/flashcards?deckId=${subject.decks[0].id}`, {
        headers: {
          "x-user-id": user.id
        }
      });
      const data = await res.json();

      setCards(data);
      setStudying(true);
    } catch (err) {
      console.error("Erro ao carregar cards:", err);
    }

    setCardsLoading(false);
  };

  // se está estudando → renderizar o viewer
  if (studying) {
    if (cardsLoading) {
      return <div className="main-content"><p>Carregando cards...</p></div>;
    }

    if (cards.length === 0) {
      return (
        <div className="main-content">
          <p>Você não possui revisões para hoje ou não existem flashcards para esse deck.</p>
          <button onClick={() => setStudying(false)}>Voltar</button>
        </div>
      );
    }

        return (
        <FlashcardViewer
          subject={currentSubject}
          cards={cards}
          onExit={() => setStudying(false)}
          user={user}   // <-- ESSENCIAL
        />
      );

  }

  // tela normal → lista de subjects
  if (loading) {
    return (
      <div className="main-content">
        <p>Carregando matérias...</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h1 className="titulo-dia">{diaSemana}</h1>

      <div className="deck-container">
        {subjects.length === 0 ? (
          <p>Você ainda não possui matérias</p>
        ) : (
          subjects.map((subject) => {
            const sombra = darkenColor(subject.color, 60);

            return (
              <div
                key={subject.id}
                className="deck-card"
                style={{
                  backgroundColor: subject.color,
                  boxShadow: `0 4px 0 ${sombra}`
                }}
              >
                <span className="deck-nome">{subject.name}</span>

                <button
                  className="btn-iniciar"
                  style={{
                    backgroundColor: subject.color,
                    boxShadow: `0 6px 0 ${sombra}`,
                    color: "white"
                  }}
                  onClick={() => iniciarEstudo(subject)}
                >
                  Iniciar
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Estudar;
