import React, { useEffect, useState } from "react";
import "./Estatisticas.css";
import { useUser } from "@clerk/clerk-react";

const Estatisticas = () => {
  const { user } = useUser();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:3001/statistics", {
      headers: { "x-user-id": user.id }
    })
      .then(res => res.json())
      .then(data => {
        console.log("ESTATÍSTICAS RECEBIDAS:", data);
        setStats(data);
      })
      .catch(err => console.error("Erro ao carregar estatísticas:", err));
  }, [user]);

  if (!stats) return <p>Carregando...</p>;

  return (
    <div className="main-content">

      <div className="estat-title-container">
        <h1>Estatísticas</h1>
      </div>

      <div className="estat-card">

        <div className="estat-metrics">
          <div className="estat-box">
            <p className="estat-value">{stats.flashcardsResolvidos}</p>
            <span>flashcards resolvidos</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">{stats.streak}</p>
            <span>sequência de revisão</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">{stats.mediaErros}%</p>
            <span>média de erros</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Estatisticas;
