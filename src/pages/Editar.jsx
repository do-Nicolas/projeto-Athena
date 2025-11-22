import React, { useState, useEffect } from "react";
import "./Editar.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";
import FlashcardCriar from "../components/FlashcardCriar"; // ← IMPORTANTE

const EditarMateria = () => {
  const { user } = useUser();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Controle do modal de flashcard
  const [showFlashcardModal, setShowFlashcardModal] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/subjects", {
          headers: { "x-user-id": user.id },
        });

        const data = await res.json();
        setSubjects(data);
      } catch (err) {
        console.error("Erro ao carregar matérias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [user]); 

  useEffect(() => {
    const found = subjects.find((s) => s.id === selectedSubjectId);
    setSelectedSubject(found || null);
  }, [selectedSubjectId, subjects]);

  // Salvar flashcard no servidor
  const handleSaveFlashcard = async ({ frente, verso, cor }) => {
    if (!selectedSubject) return;

    try {
      const res = await fetch("http://localhost:3001/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject_id: selectedSubject.id,
          front: frente,
          back: verso,
          color: cor,
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar flashcard");

      // Atualiza visualmente a lista após salva
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === selectedSubject.id
            ? { ...s, flashcards: [...s.flashcards, { front: frente, back: verso, color: cor }] }
            : s
        )
      );

      setShowFlashcardModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <p>carregando matérias...</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="editar-container">

        {showFlashcardModal && (
          <FlashcardCriar
            onClose={() => setShowFlashcardModal(false)}
            onSave={handleSaveFlashcard}
            subjectId={selectedSubject?.id}
          />
        )}

        <div className="titulo-box">escolha a matéria que você deseja editar</div>

        <select
          className="select-materia"
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
        >
          <option value="">selecionar</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {selectedSubject && (
          <div className="conteudo-edicao">

            <div className="campo-linha">
              <h2>{selectedSubject.name}</h2>
              <button className="icon-btn"><FiEdit2 /></button>
            </div>

            <div className="campo-linha">
              <p className="descricao">{selectedSubject.description}</p>
              <button className="icon-btn"><FiEdit2 /></button>
            </div>

            <h3 className="subtitulo">data de conclusão</h3>
            <p>{selectedSubject.conclusionTime || "não definida"}</p>

            <h3 className="subtitulo">flashcards</h3>

            <div className="flashcard-lista">
              {(selectedSubject.flashcards || []).map((fc) => (
                <div key={fc.id} className="flashcard-item">
                  <span>{fc.front}</span>
                  <button className="icon-btn"><FiTrash2 /></button>
                </div>
              ))}
            </div>

            <div className="linha-botoes">
              <button
                className="btn-adicionar-flashcard"
                onClick={() => setShowFlashcardModal(true)}
              >
                adicionar flashcard
              </button>

              <button
                className="btn-excluir"
                onClick={async () => {
                  if (!window.confirm("Excluir matéria?")) return;

                  try {
                    await fetch(
                      `http://localhost:3001/api/subjects/${selectedSubject.id}`,
                      { method: "DELETE" }
                    );

                    setSubjects((prev) =>
                      prev.filter((s) => s.id !== selectedSubject.id)
                    );
                    setSelectedSubject(null);
                    setSelectedSubjectId("");
                  } catch (err) {
                    alert("❌ Erro ao excluir a matéria");
                  }
                }}
              >
                excluir
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default EditarMateria;
