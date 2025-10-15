import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import "./Calendar.css";

const Calendar = () => {
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

  // Função que detecta se o mês atual está sendo exibido
  const handleDatesSet = (info) => {
    const now = new Date();
    const viewedMonth = info.start.getMonth();
    const viewedYear = info.start.getFullYear();
    setIsCurrentMonth(viewedMonth === now.getMonth() && viewedYear === now.getFullYear());
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
           contentHeight= "24rem"
          datesSet={handleDatesSet} // detecta mudança de mês
        />
       
      </div>
    </div>
  );
};

export default Calendar;
