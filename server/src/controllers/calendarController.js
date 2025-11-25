import { prisma } from "../prisma.js";

export const getCalendarEvents = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    // Pega TODOS os decks do usuário + cards
    const decks = await prisma.deck.findMany({
      where: { userId },
      include: { cards: true }
    });

    // Transforma em lista de eventos
    const events = [];

    decks.forEach(deck => {
      deck.cards.forEach(card => {
        if (!card.dueDate || !card.color) return;

        events.push({
          date: card.dueDate.toISOString().split("T")[0], // "YYYY-MM-DD"
          color: card.color
        });
      });
    });

    res.json(events);

  } catch (error) {
    console.error("Erro ao gerar eventos do calendário:", error);
    res.status(500).json({ error: "Erro ao montar calendário" });
  }
};
