import React, { useState } from "react";
import Calendar from "../components/Calendar";
import ModalCriarMateria from "../components/ModalCriarMateria";
import { useNavigate } from "react-router-dom";
import "./TelaInicial.css";

const TelaInicial = () => {
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [selectingDay, setSelectingDay] = useState(false);

  // --- Estado do formulário elevado para preservar entradas entre fechamentos ---
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [conclusao, setConclusao] = useState(""); // pode ser "1sem", "2sem" ou "YYYY-MM-DD"
  const [cor, setCor] = useState("#A6EFFF");
  const [planId /* se precisar */] = useState(null);

  const [selectedDay, setSelectedDay] = useState(null); // armazena a data escolhida no calendário

  const navigate = useNavigate();

  // Chamado pelo modal quando o usuário escolhe "Selecionar no calendário"
  const handleOpenCalendar = () => {
    setShowModalCriar(false); // fecha modal (mas estados do form são preservados)
    setSelectingDay(true);    // liga modo de seleção no calendário
  };

  // Chamado pelo Calendar quando o usuário clica em um dia
  const handleCalendarSelect = (dayIso) => {
    // dayIso é YYYY-MM-DD vindo do FullCalendar
    setSelectedDay(dayIso);
    setConclusao(dayIso);     // guarda a conclusão como a data ISO
    setSelectingDay(false);   // desliga modo de seleção
    setShowModalCriar(true);  // reabre o modal (com os campos preservados)
  };

  // Quando o modal fecha sem selecionar data (ex.: botão fechar ou cancelar),
  // apenas fecha e mantém as infos do formulário
  const handleCloseModal = () => {
    setShowModalCriar(false);
    setSelectingDay(false);
  };

  return (
    <div className="main-content">
      <div className="telaInicial-page">
        <div className="header-container">
          <h1>CRONOGRAMA</h1>
        </div>

        <div className="calendar-area">
          {/* passamos onDayClick apenas quando estamos no modo selectingDay */}
          <Calendar onDayClick={selectingDay ? handleCalendarSelect : null} />
        </div>

        <div className="botoes-container">
          <button
            className="botao-criar"
            onClick={() => setShowModalCriar(true)}
          >
            criar matéria
          </button>

          <button
            className="botao-editar"
            onClick={() => navigate("/editar")}
          >
            editar
          </button>
        </div>

        {/* MODAL: Criar matéria — passa estado e setters para preservar dados */}
        {showModalCriar && (
          <ModalCriarMateria
            onClose={handleCloseModal}
            onSelectConclusionClick={handleOpenCalendar}
            nome={nome}
            setNome={setNome}
            descricao={descricao}
            setDescricao={setDescricao}
            conclusao={conclusao}
            setConclusao={setConclusao}
            cor={cor}
            setCor={setCor}
            selectedDay={selectedDay}
            planId={planId}
          />
        )}
      </div>
    </div>
  );
};

export default TelaInicial;
