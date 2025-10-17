import React from "react";
import Calendar from "../components/Calendar";
import "./TelaInicial.css";

const TelaInicial = () => {
  return (
    <div className="main-content">
      <div className="telaInicial-page">
        <div className="header-container">
          <h1>CRONOGRAMA</h1>
        </div>

        <div className="calendar-area">
          <Calendar />
        </div>

        <div className="botoes-container">
          <button className="botao-criar">criar matéria</button>
          <button className="botao-editar">editar</button>
        </div>
      </div>
    </div>
  );
};

export default TelaInicial;
