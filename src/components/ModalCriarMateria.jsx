import React, { useState } from "react";
import "./ModalCriarMateria.css";
import { SliderPicker } from "react-color";

const ModalCriarMateria = ({ onClose }) => {
    const [cor, setCor] = useState("#A6EFFF");
  return (
    <div className="main-content">
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Criar Matéria</h2>

        <form className="form-materia">
          <label>Nome</label>
          <input type="text" placeholder="adicione um nome para sua matéria" />

          <label>descrição (opcional)</label>
          <textarea placeholder="Fale sobre o conteúdo da sua matéria" />

          <label>data de conclusão</label>
          <div className="select-wrapper">
            <select>
              <option value="">selecionar</option>
              <option value="1sem">1 semestre</option>
              <option value="2sem">2 semestres</option>
            </select>
          </div>

         <div className="input-group color-picker-group">
         <label>Personalização</label>
         <SliderPicker color={cor} onChange={(novaCor) => setCor(novaCor.hex)} />
        </div>


          <button type="submit" className="botao-confirmar">
            confirmar
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ModalCriarMateria;
