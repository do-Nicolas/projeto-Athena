import React, { useEffect, useState } from "react";
import "./ModalEditarMateria.css";

import { FaTrash } from "react-icons/fa";
import FlashcardCriar from "./FlashcardCriar";

const ModalEditarMateria = ({ onClose }) => {

  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [flashcards, setFlashcards] = useState([]);
  const [selectedFlashcard, setSelectedFlashcard] = useState("");

  const [showModalFlashCard, setShowModalFlashCard] = useState(false);

  // Buscar matérias
  useEffect(() => {
    carregarMaterias();
  }, []);

  const carregarMaterias = () => {
    fetch("http://localhost:3001/api/subjects")
      .then((res) => res.json())
      .then((data) => setSubjects(data))
      .catch((err) => console.error("Erro ao carregar matérias:", err));
  };

  useEffect(() => {
    console.log("MATÉRIAS CARREGADAS:", subjects);
  }, [subjects]);

  // Buscar flashcards QUANDO selecionar matéria
  useEffect(() => {
    if (!selectedSubject) return;

    fetch(`http://localhost:3001/api/flashcards?subject_id=${selectedSubject.id}`)
      .then((res) => res.json())
      .then((data) => setFlashcards(data))
      .catch((err) => console.error("Erro ao carregar flashcards:", err));
  }, [selectedSubject]);

  // Excluir matéria
  const deletarMateria = async () => {
    if (!selectedSubject) return;

    if (!window.confirm(`Tem certeza que deseja excluir "${selectedSubject.name}" ?`))
      return;

    try {
      await fetch(`http://localhost:3001/api/subjects/${selectedSubject.id}`, {
        method: "DELETE",
      });

      // Remove a matéria do estado sem precisar recarregar página
      setSubjects((prev) => prev.filter((s) => s.id !== selectedSubject.id));
      setSelectedSubject(null);
      setSelectedFlashcard("");

      alert("Matéria excluída!");

    } catch (err) {
      console.error("Erro ao excluir matéria:", err);
      alert("Erro ao excluir!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">

        <button className="close-button" onClick={onClose}>×</button>

        <h2>Editar Matéria</h2>

        <div className="form-materia">

          {/* SELECTOR DE MATÉRIA */}
          <label>Selecionar matéria</label>
          <select
            value={selectedSubject?.id || ""}
            onChange={(e) => {
              const subj = subjects.find((s) => s.id === e.target.value);
              setSelectedSubject(subj);
              setSelectedFlashcard("");
            }}
          >
            <option value="">Selecionar…</option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.id}>
                {subj.name}
              </option>
            ))}
          </select>

          {/* Só aparece quando selecionar matéria */}
          {selectedSubject && (
            <>
              {/* Flashcards */}
              <label style={{ marginTop: "15px" }}>Flashcards da matéria</label>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <select
                  value={selectedFlashcard}
                  onChange={(e) => setSelectedFlashcard(e.target.value)}
                >
                  <option value="">Selecionar…</option>
                  {flashcards.map((fc) => (
                    <option key={fc.id} value={fc.id}>
                      {fc.pergunta}
                    </option>
                  ))}
                </select>

                {/* Botão criar flashcard */}
                <button
                  style={{
                    padding: "8px 14px",
                    background: "#A6EFFF",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                  onClick={() => setShowModalFlashCard(true)}
                >
                  +
                </button>
              </div>

              {/* Excluir matéria */}
              <button
                onClick={deletarMateria}
                style={{
                  backgroundColor: "#ff6b6b",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "10px",
                  marginTop: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <FaTrash /> Excluir matéria
              </button>
            </>
          )}
        </div>

        {/* MODAL: Criar flashcard */}
        {showModalFlashCard && (
          <FlashcardCriar onClose={() => setShowModalFlashCard(false)} />
        )}

      </div>
    </div>
  );
};

export default ModalEditarMateria;
