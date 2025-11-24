import React, { useEffect } from "react";
import "./ModalCriarMateria.css";
import { SliderPicker } from "react-color";
import { useUser } from "@clerk/clerk-react";

const formatDateToBR = (iso) => {
  if (!iso) return "";
  // iso esperado: "YYYY-MM-DD"
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
};

const ModalCriarMateria = ({
  onClose,
  onSelectConclusionClick,
  nome,
  setNome,
  descricao,
  setDescricao,
  conclusao,
  setConclusao,
  cor,
  setCor,
  selectedDay,
  planId,
}) => {
  const { user } = useUser();

  // Se voltamos do calendário com selectedDay, já atualizamos o campo
  // (na prática, isso já é feito no pai — mas mantemos efeito caso queira sincronizar)
  useEffect(() => {
    if (selectedDay) {
      setConclusao(selectedDay);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay]);

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
                value={conclusao || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  // se o usuário escolheu a opção "calendar", avisamos o pai para abrir o calendário
                  if (value === "calendar") {
                    // não limpar o restante do formulário: o pai já mantém tudo
                    onSelectConclusionClick && onSelectConclusionClick();
                  } else {
                    setConclusao(value);
                  }
                }}
                required
              >
                <option value="">Selecionar</option>
                {conclusao && /^\d{4}-\d{2}-\d{2}$/.test(conclusao) && (
                  <option value={conclusao}>
                    Concluir em {formatDateToBR(conclusao)}
                  </option>
                )}


              {/* opção para abrir calendário */}
              <option value="calendar">Selecionar no calendário</option>
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
