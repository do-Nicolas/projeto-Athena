import React, { useState, useEffect } from "react";
import "./Editar.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";
import FlashcardCriar from "../components/FlashcardCriar";

const EditarMateria = () => {
  const { user } = useUser();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deckSelecionado, setDeckSelecionado] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFlashcardModal, setShowFlashcardModal] = useState(false);

  // 1️⃣ Buscar matérias
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

  // 2️⃣ Atualizar matéria selecionada
  useEffect(() => {
    if (!selectedSubjectId) return;

    const found = subjects.find((s) => s.id === selectedSubjectId) || null;
    setSelectedSubject(found);
  }, [selectedSubjectId, subjects]);

  // 3️⃣ Buscar deck + cards da matéria
  useEffect(() => {
    if (!selectedSubjectId) return;

    const fetchDeckAndCards = async () => {
      try {
        const deckRes = await fetch(
          `http://localhost:3001/decks/by-subject/${selectedSubjectId}`
        );

        const deck = await deckRes.json();

        if (!deck || !deck.id) {
          setDeckSelecionado(null);
          return;
        }

        setDeckSelecionado(deck);

        const cardsRes = await fetch(
          `http://localhost:3001/decks/${deck.id}/cards`
        );
        const cards = await cardsRes.json();

        setSubjects((prev) =>
          prev.map((s) =>
            s.id === selectedSubjectId ? { ...s, flashcards: cards } : s
          )
        );
      } catch (err) {
        console.error("Erro ao carregar flashcards:", err);
      }
    };

    fetchDeckAndCards();
  }, [selectedSubjectId]);

  // 4️⃣ Criar flashcard (agora só recebe o card já criado)
  const criarFlashcard = (novoCard) => {
    setSubjects((prev) =>
      prev.map((s) =>
        s.id === selectedSubjectId
          ? { ...s, flashcards: [...(s.flashcards || []), novoCard] }
          : s
      )
    );

    setShowFlashcardModal(false);
  };

  // 5️⃣ Excluir matéria
  const deletarMateria = async () => {
    if (!selectedSubjectId) return;

    if (!confirm("Deseja realmente excluir esta matéria?")) return;

    try {
      await fetch(`http://localhost:3001/api/subjects/${selectedSubjectId}`, {
        method: "DELETE",
        headers: { "x-user-id": user.id },
      });

      // Remove da lista local
      setSubjects((prev) => prev.filter((s) => s.id !== selectedSubjectId));

      // Limpa seleção
      setSelectedSubjectId("");
      setSelectedSubject(null);
      setDeckSelecionado(null);
    } catch (err) {
      console.error("Erro ao excluir matéria:", err);
      alert("Erro ao excluir matéria");
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

        {/* Modal */}
        {showFlashcardModal && (
          <FlashcardCriar
            onClose={() => setShowFlashcardModal(false)}
            deckId={deckSelecionado?.id}
            userId={user.id}
            onSave={criarFlashcard}
          />
        )}

        <div className="titulo-box">
          escolha a matéria que você deseja editar
        </div>

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
              <button className="icon-btn">
                <FiEdit2 />
              </button>
            </div>

            <div className="campo-linha">
              <p className="descricao">{selectedSubject.description}</p>
              <button className="icon-btn">
                <FiEdit2 />
              </button>
            </div>

            <h3 className="subtitulo">flashcards</h3>

            <div className="flashcard-lista">
              {(selectedSubject.flashcards || []).map((fc) => (
                <div key={fc.id} className="flashcard-item">
                  <span>{fc.front}</span>
                  <button className="icon-btn">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* 🔥 Botões restaurados */}
            <div className="linha-botoes">
              <button
                className="btn-adicionar-flashcard"
                onClick={() => setShowFlashcardModal(true)}
              >
                adicionar flashcard
              </button>

              <button
                className="btn-excluir"
                onClick={deletarMateria}
              >
                excluir matéria
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default EditarMateria;
