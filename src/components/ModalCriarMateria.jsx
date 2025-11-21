import React, { useState } from "react";
import "./ModalCriarMateria.css";
import { SliderPicker } from "react-color";
import { useUser } from "@clerk/clerk-react";   // 🔥 IMPORTANTE

const ModalCriarMateria = ({ onClose, planId }) => {
  const { user } = useUser(); // 🔥 pega o usuário atual do Clerk

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conclusao, setConclusao] = useState("");
  const [cor, setCor] = useState("#A6EFFF");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({
        userId: user.id,
        planId: planId,
        name: nome,
        description: descricao,
        conclusionTime: conclusao,
        color: cor,
      }),

      });

      if (!response.ok) {
        const text = await response.text();
        console.error("STATUS:", response.status);
        console.error("RESPOSTA DO SERVIDOR:", text);
        throw new Error("Erro ao criar matéria");
      }

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            ×
          </button>
          <h2>Criar Matéria</h2>

          <form className="form-materia" onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
              type="text"
              placeholder="Adicione um nome para sua matéria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <label>Descrição (opcional)</label>
            <textarea
              placeholder="Fale sobre o conteúdo da sua matéria"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <label>Tempo até conclusão</label>
            <select
              value={conclusao}
              onChange={(e) => setConclusao(e.target.value)}
              required
            >
              <option value="">Selecionar</option>
              <option value="1sem">1 semestre</option>
              <option value="2sem">2 semestres</option>
            </select>

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
    </div>
  );
};

export default ModalCriarMateria;
