import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import "./Calendar.css";

/**
 * Props:
 * - onDayClick(dateIso)
 * - userId (opcional) -> se passar, será enviado no header x-user-id
 * - fetchUrl (opcional) -> default "/calendar"
 */
const Calendar = ({ onDayClick, userId = null, fetchUrl = "/calendar" }) => {
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadedCount, setLoadedCount] = useState(null);

  useEffect(() => {
    let mounted = true;

    const doFetch = async () => {
      try {
        const headers = {};
        if (userId) headers["x-user-id"] = userId;

        // usa o mesmo host da aplicação (relativo). Ajuste se sua API estiver em outro host.
        const res = await fetch(fetchUrl, { headers });
        if (!res.ok) {
          const text = await res.text();
          console.error("Calendar fetch error (non-2xx):", res.status, text);
          if (!mounted) return;
          setLoadedCount(0);
          return;
        }

        const data = await res.json();
        console.log("Calendar raw response:", data);

        // Aceitamos formatos:
        // 1) [{ date: 'YYYY-MM-DD', color: '#...' }, ...]
        // 2) [{ start: 'YYYY-MM-DD', display: 'background', backgroundColor: '#...' }, ...]
        // 3) decks -> transformamos se vierem { decks: [...] } ou [{ cards: [...] }]
        let normalized = [];

        if (Array.isArray(data)) {
          // caso já venha no formato events
          if (data.length > 0 && data[0].start) {
            normalized = data.map((ev) => ({
              start: ev.start,
              display: ev.display || "background",
              backgroundColor: ev.backgroundColor || ev.color || ev.bg || ev.background,
              borderColor: ev.borderColor || ev.backgroundColor || ev.color,
            }));
          } else if (data.length > 0 && (data[0].date || data[0].dueDate)) {
            normalized = data.flatMap((ev) => {
              const date = ev.date || (ev.dueDate ? ev.dueDate.split("T")[0] : null);
              if (!date) return [];
              return {
                start: date,
                display: "background",
                backgroundColor: ev.color || ev.colorHex || "#A6EFFF",
                borderColor: ev.color || ev.colorHex || "#A6EFFF",
              };
            });
          } else if (data.length > 0 && data[0].cards) {
            // se API retornou decks com cards
            normalized = data.flatMap((deck) =>
              (deck.cards || []).map((c) => {
                const d = c.dueDate ? c.dueDate.split("T")[0] : null;
                if (!d) return null;
                return {
                  start: d,
                  display: "background",
                  backgroundColor: c.color || "#A6EFFF",
                  borderColor: c.color || "#A6EFFF",
                };
              }).filter(Boolean)
            );
          } else {
            // array vazio ou formato desconhecido -> apenas log
            console.warn("Calendar: resposta em array mas formato inesperado:", data[0]);
            normalized = [];
          }
        } else if (data && typeof data === "object") {
          // se o servidor devolveu um objeto com chave (ex: { events: [...] } ou { decks: [...] })
          if (Array.isArray(data.events)) {
            normalized = data.events.map((ev) => ({
              start: ev.date || ev.start,
              display: "background",
              backgroundColor: ev.color || ev.backgroundColor || "#A6EFFF",
              borderColor: ev.color || ev.borderColor || "#A6EFFF",
            }));
          } else if (Array.isArray(data.decks)) {
            normalized = data.decks.flatMap((deck) =>
              (deck.cards || []).map((c) => ({
                start: c.dueDate ? c.dueDate.split("T")[0] : null,
                display: "background",
                backgroundColor: c.color || "#A6EFFF",
                borderColor: c.color || "#A6EFFF",
              })).filter(Boolean)
            );
          } else {
            console.warn("Calendar: objeto recebido, formato não reconhecido:", data);
            normalized = [];
          }
        }

        // deduplicar por start+color (opcional)
        const dedup = [];
        const seen = new Set();
        for (const e of normalized) {
          const key = `${e.start}__${e.backgroundColor}`;
          if (!seen.has(key)) {
            seen.add(key);
            dedup.push(e);
          }
        }

        if (!mounted) return;
        setEvents(dedup);
        setLoadedCount(dedup.length);
        console.log("Calendar normalized events:", dedup);
      } catch (err) {
        console.error("Erro ao carregar eventos do calendário:", err);
        if (!mounted) return;
        setLoadedCount(0);
      }
    };

    doFetch();

    return () => {
      mounted = false;
    };
  }, [userId, fetchUrl]);

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

    const [year, month, day] = info.dateStr.split("-").map(Number);
    const clicked = new Date(year, month - 1, day);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const seteDiasDepois = new Date(hoje);
    seteDiasDepois.setDate(hoje.getDate() + 7);
    seteDiasDepois.setHours(0, 0, 0, 0);

    if (clicked < seteDiasDepois) {
      alert("Você só pode escolher datas daqui 7 dias.");
      return;
    }

    onDayClick(info.dateStr);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-background" /> {/* garante o fundo já no DOM */}

      {/* badge de debug (mostra quantos eventos carregados) */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 220,
          zIndex: 2,
          background: "rgba(255,255,255,0.9)",
          padding: "6px 10px",
          borderRadius: 8,
          fontSize: 13,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        eventos: {loadedCount === null ? "..." : loadedCount}
      </div>

      <div className="calendar-container" style={{ zIndex: 1 }}>
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
          datesSet={handleDatesSet}
          dateClick={handleDateClick}
          events={events}
          eventDisplay="background"
        />
      </div>
    </div>
  );
};

export default Calendar;
