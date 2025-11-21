import React, { useEffect, useState } from "react";
import "./Estudar.css";
import { darkenColor } from "../utils/ColorUtils";
import { useUser } from "@clerk/clerk-react";   // 🔥 IMPORTANTE

const Estudar = () => {
  const { user } = useUser(); // pega o usuário logado

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  const hoje = new Date();
  const diaSemana = diasDaSemana[hoje.getDay()];

  useEffect(() => {
    if (!user) return; // espera o Clerk carregar

    fetch("http://localhost:3001/api/subjects", {
      headers: {
        "x-user-id": user.id,   // 🔥 ENVIA O ID DO USUÁRIO
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar matérias:", err);
        setLoading(false);
      });
  }, [user]); // só executa quando o usuário for carregado

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
