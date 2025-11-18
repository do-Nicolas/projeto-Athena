import React, { useState } from "react";
import { SliderPicker } from "react-color";
import "./FlashcardCriar.css";

const FlashcardCriar = ({ onClose, onSave }) => {
  const [frente, setFrente] = useState("");
  const [verso, setVerso] = useState("");
  const [cor, setCor] = useState("#ffffff");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({ frente, verso, cor });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-button" onClick={onClose}>×</button>

        <h2>Criar Flashcard</h2>

        <form className="form-materia" onSubmit={handleSubmit}>

          {/* Frente */}
          <label>Frente</label>
          <input
            type="text"
            placeholder="Digite o conteúdo da frente"
            value={frente}
            onChange={(e) => setFrente(e.target.value)}
            required
          />

          {/* Verso */}
          <label>Verso</label>
          <textarea
            placeholder="Digite o conteúdo do verso"
            value={verso}
            onChange={(e) => setVerso(e.target.value)}
            required
          />

          {/* Personalização de cor — mesmo design da matéria */}
          <label>Personalização</label>
          <div className="input-group color-picker-group">
            <SliderPicker
              color={cor}
              onChange={(novaCor) => setCor(novaCor.hex)}
            />
          </div>

          <button type="submit" className="botao-confirmar">
            Confirmar
          </button>

        </form>
      </div>
    </div>
  );
};

export default FlashcardCriar;