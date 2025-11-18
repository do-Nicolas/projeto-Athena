import React from "react";
import "./Estatisticas.css";

const Estatisticas = () => {
  return (
    <div className="main-content">

      <div className="estat-card">

        <h1 className="estat-title">Estatísticas</h1>

       

        <div className="estat-metrics">
          <div className="estat-box">
            <p className="estat-value">0</p>
            <span>atividades realizadas</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">0</p>
            <span>horas de estudo</span>
          </div>

          <div className="estat-box">
            <p className="estat-value">0</p>
            <span>flashcards resolvidos</span>
          </div>
        </div>

        <div className="estat-graph">

          <div className="estat-bar green">
            <span>X</span>
          </div>

          <div className="estat-bar red">
            <span>Y</span>
          </div>

        </div>

        <div className="estat-legend">
          <p className="green-label">acertos</p>
          <p className="red-label">erros</p>
        </div>

      </div>

    </div>
  );
};

export default Estatisticas;