import React, { useState } from "react";
import { SliderPicker } from "react-color";
import "./FlashcardCriar.css";

const FlashcardCriar = ({ onClose, onSave, deckId, userId }) => {
  const [frente, setFrente] = useState("");
  const [verso, setVerso] = useState("");
  const [cor, setCor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
        body: JSON.stringify({
          front: frente,
          back: verso,
          color: cor,
          deckId: deckId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro ao criar flashcard:", data);
        alert(data.error || "Erro ao criar flashcard");
        return;
      }

      // Envia o novo card para o pai
      onSave(data);

      // Fecha o modal
      onClose();

    } catch (err) {
      console.error("Erro geral:", err);
      alert("Erro ao conectar ao servidor");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>

        <h2>Criar Flashcard</h2>

        <form className="form-materia" onSubmit={handleSubmit}>

          <label>Frente</label>
          <input
            type="text"
            placeholder="Conteúdo da frente"
            value={frente}
            onChange={(e) => setFrente(e.target.value)}
            required
          />

          <label>Verso</label>
          <textarea
            placeholder="Conteúdo do verso"
            value={verso}
            onChange={(e) => setVerso(e.target.value)}
            required
          />

          <label>Cor do Flashcard</label>

          <div
            className="cor-preview"
            style={{
              background: cor,
              width: "100%",
              height: "40px",
              borderRadius: "6px",
              marginBottom: "10px",
              border: "1px solid #ccc",
            }}
          />

          <SliderPicker
            color={cor}
            onChange={(novaCor) => setCor(novaCor.hex)}
          />

          <button
            type="submit"
            className="botao-confirmar"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Confirmar"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default FlashcardCriar;
