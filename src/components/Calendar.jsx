import React from 'react'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br"

const Calendar = () => {
  return (
    <>
    <div >
    <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]
    }
    locale={ptBrLocale}
    /> 
    </div>
    </>
  )
}

export default Calendar