import React, { useState } from "react";
import Calendar from "../components/Calendar";
import ModalCriarMateria from "../components/ModalCriarMateria";
import ModalEditarMateria from "../components/ModalEditarMateria"; // <-- IMPORTANTE
import "./TelaInicial.css";

const TelaInicial = () => {
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);

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
          {/* Botão criar */}
          <button
            className="botao-criar"
            onClick={() => setShowModalCriar(true)}
          >
            criar matéria
          </button>

          {/* Botão editar */}
          <button
            className="botao-editar"
            onClick={() => setShowModalEditar(true)}
          >
            editar
          </button>
        </div>

        {/* MODAL: Criar matéria */}
        {showModalCriar && (
          <ModalCriarMateria onClose={() => setShowModalCriar(false)} />
        )}

        {/* MODAL: Editar matéria */}
        {showModalEditar && (
          <ModalEditarMateria onClose={() => setShowModalEditar(false)} />
        )}
      </div>
    </div>
  );
};

export default TelaInicial;
