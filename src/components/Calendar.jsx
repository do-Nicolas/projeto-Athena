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
  const clicked = new Date(year, month - 1, day);

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // 📌 Data mínima permitida: daqui 7 dias
  const seteDiasDepois = new Date(hoje);
  seteDiasDepois.setDate(hoje.getDate() + 7);
  seteDiasDepois.setHours(0, 0, 0, 0);

  // ⛔ Bloquear antes de 7 dias
  if (clicked < seteDiasDepois) {
    alert("Você só pode escolher datas daqui 7 dias.");
    return;
  }

  // ✔ Liberar data
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
