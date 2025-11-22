import React, { useState, useEffect } from "react";
import "./Editar.css";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useUser } from "@clerk/clerk-react";

const EditarMateria = () => {
  const { user } = useUser();

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Buscar matérias
  useEffect(() => {
    if (!user) return;

    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/subjects", {
          headers: {
            "x-user-id": user.id,
          },
        });

        if (!res.ok) throw new Error("Falha ao buscar matérias");

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

  // Atualizar conteúdo da matéria
  useEffect(() => {
    const found = subjects.find((s) => s.id === selectedSubjectId);
    setSelectedSubject(found || null);
  }, [selectedSubjectId, subjects]);

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
        
        {/* Título */}
        <div className="titulo-box">
          escolha a matéria que você deseja editar
        </div>

        {/* SELECT */}
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

        {/* CONTEÚDO */}
        {selectedSubject && (
          <div className="conteudo-edicao">
            
            {/* Nome */}
            <div className="campo-linha">
              <h2>{selectedSubject.name}</h2>
              <button className="icon-btn"><FiEdit2 /></button>
            </div>

            {/* Descrição */}
            <div className="campo-linha">
              <p className="descricao">{selectedSubject.description}</p>
              <button className="icon-btn"><FiEdit2 /></button>
            </div>

            {/* Data de conclusão */}
            <h3 className="subtitulo">data de conclusão</h3>
            <p>{selectedSubject.conclusionTime || "não definida"}</p>

            {/* Flashcards */}
            <h3 className="subtitulo">flashcards</h3>

            <div className="flashcard-lista">
              {(selectedSubject.flashcards || []).map((fc) => (
                <div key={fc.id} className="flashcard-item">
                  <span>{fc.title}</span>
                  <button className="icon-btn">
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Botões alinhados */}
            <div className="linha-botoes">
              <button className="btn-adicionar-flashcard">
                adicionar flashcard
              </button>

              <button
                className="btn-excluir"
                onClick={async () => {
                  if (!window.confirm("Tem certeza que deseja excluir esta matéria?")) return;

                  try {
                    const res = await fetch(`http://localhost:3001/api/subjects/${selectedSubject.id}`, {
                      method: "DELETE",
                    });

                    if (!res.ok) throw new Error("Erro ao excluir");

                    setSubjects((prev) =>
                      prev.filter((s) => s.id !== selectedSubject.id)
                    );
                    setSelectedSubject(null);
                    setSelectedSubjectId("");

                  } catch (err) {
                    alert("❌ Erro ao excluir a matéria");
                    console.error(err);
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
