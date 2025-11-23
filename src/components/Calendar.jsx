import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import "./Calendar.css";

const Calendar = ({ onDayClick }) => {
  const [isCurrentMonth, setIsCurrentMonth] = useState(true); // Detecta se o mês atual está sendo exibido

  const handleDatesSet = (info) => {
    const now = new Date();
    const viewedMonth = info.start.getMonth();
    const viewedYear = info.start.getFullYear();

    setIsCurrentMonth(
      viewedMonth === now.getMonth() && viewedYear === now.getFullYear()
    );
  };

 const handleDateClick = (info) => {
  if (!onDayClick) return;

  // Criar a data clicada sem conversão UTC
  const [year, month, day] = info.dateStr.split("-").map(Number);
  const clicked = new Date(year, month - 1, day); // sempre local

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // 📌 Encontrar o próximo domingo (fim da semana atual)
  const proximoDomingo = new Date(hoje);
  const diasAteDomingo = 7 - hoje.getDay();
  proximoDomingo.setDate(hoje.getDate() + diasAteDomingo);
  proximoDomingo.setHours(0, 0, 0, 0);

  // 📌 Primeira data permitida: SEGUNDA da próxima semana
  const primeiraPermitida = new Date(proximoDomingo);
  primeiraPermitida.setDate(proximoDomingo.getDate() + 1);
  primeiraPermitida.setHours(0, 0, 0, 0);

  // ⛔ Bloquear até domingo
  if (clicked < primeiraPermitida) {
    alert("Você só pode escolher datas a partir da próxima semana.");
    return;
  }

  // ✔ Permitir segunda em diante
  onDayClick(info.dateStr);
};


  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptBrLocale}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          contentHeight="24rem"
          datesSet={handleDatesSet}   // detecta mudança de mês
          dateClick={handleDateClick} // 🔥 dispara quando clicar no dia
        />
      </div>
    </div>
  );
};

export default Calendar;
