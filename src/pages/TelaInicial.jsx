import React, { useState } from "react";
import Calendar from "../components/Calendar";
import ModalCriarMateria from "../components/ModalCriarMateria";
import { useNavigate } from "react-router-dom";
import "./TelaInicial.css";

const TelaInicial = () => {
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const navigate = useNavigate(); // Navegação

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
            onClick={() => navigate("/editar")} // Navega para /editar
          >
            editar
          </button>
        </div>

        {/* MODAL: Criar matéria */}
        {showModalCriar && (
          <ModalCriarMateria onClose={() => setShowModalCriar(false)} />
        )}
      </div>
    </div>
  );
};

export default TelaInicial;
