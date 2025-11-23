// controllers/deckController.js
import { prisma } from "../prisma.js";

// 📌 Listar todos os decks do usuário
export const getAllDecks = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    const decks = await prisma.deck.findMany({
      where: { userId },
      include: {
        subject: true,
        cards: true
      }
    });

    res.json(decks);
  } catch (error) {
    console.error("Erro no getAllDecks:", error);
    res.status(500).json({ error: "Erro ao buscar decks" });
  }
};


// 📌 Criar um deck (SEM título e descrição)
export const createDeck = async (req, res) => {
  try {
    const { subjectId, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    const deck = await prisma.deck.create({
      data: {
        userId,
        subjectId,
      },
    });

    res.status(201).json(deck);
  } catch (error) {
    console.error("Erro no createDeck:", error);
    res.status(500).json({ error: "Erro ao criar deck", details: error.message });
  }
};

// 📌 Buscar deck pela matéria
export const getDeckBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const deck = await prisma.deck.findFirst({
      where: { subjectId },
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck não encontrado para essa matéria" });
    }

    res.json(deck);
  } catch (error) {
    console.error("Erro no getDeckBySubject:", error);
    res.status(500).json({ error: "Erro ao buscar deck da matéria" });
  }
};

// 📌 Listar todos os flashcards de um deck
export const getFlashcardsFromDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
      include: { cards: true }
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck não encontrado" });
    }

    res.json(deck.cards);
  } catch (error) {
    console.error("Erro no getFlashcardsFromDeck:", error);
    res.status(500).json({ error: "Erro ao buscar flashcards" });
  }
};


// 📌 Deletar um deck
export const deleteDeck = async (req, res) => {
  try {
    const { deckId } = req.params;

    await prisma.deck.delete({
      where: { id: deckId },
    });

    res.json({ message: "Deck deletado com sucesso" });
  } catch (error) {
    console.error("Erro no deleteDeck:", error);
    res.status(500).json({ error: "Erro ao deletar deck", details: error.message });
  }
};
