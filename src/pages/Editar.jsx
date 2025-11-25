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
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  const [tempName, setTempName] = useState("");
  const [tempDescription, setTempDescription] = useState("");

  const [loading, setLoading] = useState(true);

  const [showFlashcardModal, setShowFlashcardModal] = useState(false);

  // Dropdown aberto/fechado
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const formatarData = (isoString) => {
      if (!isoString) return "Sem data";
      const data = new Date(isoString);
      return data.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

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
            s.id === selectedSubjectId
              ? { ...s, flashcards: cards || [] }
              : s
          )
        );
      } catch (err) {
        console.error("Erro ao carregar flashcards:", err);
      }
    };

    fetchDeckAndCards();
  }, [selectedSubjectId]);

  // 4️⃣ Criar flashcard
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

  // 6️⃣ Excluir flashcard
  const deletarFlashcard = async (flashcardId) => {
    if (!flashcardId) return;

    if (!confirm("Deseja realmente excluir este flashcard?")) return;

    try {
      await fetch(`http://localhost:3001/flashcards/${flashcardId}`, {
        method: "DELETE",
        headers: { "x-user-id": user.id },
      });

      setSubjects((prev) =>
        prev.map((s) =>
          s.id === selectedSubjectId
            ? {
                ...s,
                flashcards: s.flashcards.filter((fc) => fc.id !== flashcardId),
              }
            : s
        )
      );
    } catch (err) {
      console.error("Erro ao excluir flashcard:", err);
      alert("Erro ao excluir flashcard");
    }
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

      setSubjects((prev) => prev.filter((s) => s.id !== selectedSubjectId));

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
  const salvarEdicao = async (campo) => {
  if (!selectedSubject) return;

  const body = {};

  if (campo === "name") body.name = tempName;
  if (campo === "description") body.description = tempDescription;

  try {
    const res = await fetch(
      `http://localhost:3001/api/subjects/${selectedSubject.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id,
        },
        body: JSON.stringify(body),
      }
    );

    const updated = await res.json();

    // Atualiza lista de matérias
    setSubjects((prev) =>
      prev.map((s) => (s.id === selectedSubject.id ? updated : s))
    );

    setSelectedSubject(updated);

    // Fecha edição
    setEditName(false);
    setEditDescription(false);
  } catch (err) {
    console.error("Erro ao atualizar:", err);
    alert("Erro ao salvar alterações");
  }
};

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

        {/* 🔥 DROPDOWN CUSTOMIZADO */}
        <div className="dropdown-materia">
          <div
            className="dropdown-header"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedSubjectId
              ? subjects.find((s) => s.id === selectedSubjectId)?.name
              : "selecionar"}
          </div>

          <div className={`dropdown-menu ${dropdownOpen ? "open" : ""}`}>
            {subjects.map((s) => (
              <div
                key={s.id}
                className="dropdown-item"
                onClick={() => {
                  setSelectedSubjectId(s.id);
                  setDropdownOpen(false);
                }}
              >
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {selectedSubject && (
  <div className="conteudo-edicao">

    {/* === NOME DA MATÉRIA === */}
    <div className="linha-editavel">
      {!editName ? (
        <>
          <h2 className="titulo-materia">{selectedSubject.name}</h2>
          <button
            className="icon-btn"
            onClick={() => {
              setTempName(selectedSubject.name);
              setEditName(true);
            }}
          >
            <FiEdit2 />
          </button>
        </>
      ) : (
        <div className="edit-inline">
          <input
            className="edit-input"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />

          <button className="save-btn" onClick={() => salvarEdicao("name")}>
            salvar
          </button>

          <button className="cancel-btn" onClick={() => setEditName(false)}>
            cancelar
          </button>
        </div>
      )}
    </div>

    {/* === DESCRIÇÃO === */}
    {!editDescription ? (
      <div className="linha-editavel">
        <div className="descricao-box">
          <p className="descricao">{selectedSubject.description}</p>
          <p className="data-conclusao">
            Data para conclusão: {formatarData(selectedSubject.conclusionTime)}
          </p>
        </div>

        <button
          className="icon-btn"
          onClick={() => {
            setTempDescription(selectedSubject.description || "");
            setEditDescription(true);
          }}
        >
          <FiEdit2 />
        </button>
      </div>
    ) : (
      <div className="edit-coluna">
        <textarea
          className="edit-input"
          value={tempDescription}
          onChange={(e) => setTempDescription(e.target.value)}
        />

        <div className="linha-edit">
          <button
            className="save-btn"
            onClick={() => salvarEdicao("description")}
          >
            salvar
          </button>

          <button
            className="cancel-btn"
            onClick={() => setEditDescription(false)}
          >
            cancelar
          </button>
        </div>
      </div>
    )}

    {/* === FLASHCARDS === */}
    <h3 className="subtitulo">flashcards</h3>

    <div
      className={`flashcard-lista ${
        (selectedSubject.flashcards || []).length === 0 ? "vazio" : ""
      }`}
    >
      {(selectedSubject.flashcards || []).length === 0 ? (
        <div className="flashcard-vazio-msg">
          Nenhum flashcard criado ainda.
        </div>
      ) : (
        (selectedSubject.flashcards || []).map((fc) => (
          <div key={fc.id} className="flashcard-item">
            <div className="flashcard-text">
              <span className="front-text">{fc.front}</span>
            </div>

            <button
              className="icon-btn"
              onClick={() => deletarFlashcard(fc.id)}
            >
              <FiTrash2 />
            </button>
          </div>
        ))
      )}
    </div>

    <div className="linha-botoes">
      <button
        className="btn-adicionar-flashcard"
        onClick={() => setShowFlashcardModal(true)}
      >
        adicionar flashcard
      </button>

      <button className="btn-excluir" onClick={deletarMateria}>
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
