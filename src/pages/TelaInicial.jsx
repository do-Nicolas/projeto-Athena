import React, { useState } from "react";
import Calendar from "../components/Calendar";
import ModalCriarMateria from "../components/ModalCriarMateria";
import "./TelaInicial.css";

const TelaInicial = () => {
   const [showModal, setShowModal] = useState(false);
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
          <button className="botao-criar" onClick={() => setShowModal(true)}>criar matéria</button>
          <button className="botao-editar">editar</button>
        </div>
         {showModal && <ModalCriarMateria onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};

export default TelaInicial;
