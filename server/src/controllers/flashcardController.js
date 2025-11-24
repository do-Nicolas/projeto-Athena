// controllers/flashcardController.js
import { prisma } from "../prisma.js";
import { reviewCard } from "../services/reviewService.js";

/*  
  GET /flashcards
  - Lista todos os flashcards do usuário
  - Suporta filtro opcional por deckId ou topicId
*/
export const getAllFlashcards = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { deckId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    // Agora
    const now = new Date();

    const cards = await prisma.card.findMany({
      where: {
        deck: { userId },
        ...(deckId && { deckId }),

        // 🔥 Só retorna cards cujo dueDate é HOJE ou ANTES
        dueDate: {
          lte: now
        }
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(cards);

  } catch (error) {
    console.error("Erro ao listar flashcards:", error);
    res.status(500).json({ error: "Erro ao buscar flashcards" });
  }
};


/*  
  POST /flashcards
  - Cria um flashcard
  - Pode ser associado a um Deck ou a um Tópico
*/
export const createFlashcard = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { front, back, color, deckId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado no header (x-user-id)" });
    }

    if (!front) {
      return res.status(400).json({ error: "Campo 'front' é obrigatório" });
    }

    if (!deckId) {
      return res.status(400).json({ error: "É necessário informar deckId" });
    }

    // 🔐 Garantir que o deck pertence ao usuário
    const deck = await prisma.deck.findFirst({
      where: { id: deckId, userId },
    });

    if (!deck) {
      return res.status(403).json({ error: "Deck não pertence ao usuário" });
    }

    const card = await prisma.card.create({
      data: {
        front,
        back,
        color,
        deckId
      },
    });

    res.status(201).json(card);

  } catch (error) {
    console.error("Erro ao criar flashcard:", error);
    res.status(500).json({ 
      error: "Erro ao criar flashcard", 
      details: error.message 
    });
  }
};

/*  
  DELETE /flashcards/:id
*/
export const deleteFlashcard = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado no header (x-user-id)" });
    }

    // Garantir que o card pertence ao user (via deck)
    const card = await prisma.card.findUnique({
      where: { id },
      include: { deck: true },
    });

    if (!card) {
      return res.status(404).json({ error: "Flashcard não encontrado" });
    }

    if (card.deck.userId !== userId) {
      return res.status(403).json({ error: "Você não tem permissão para excluir este flashcard" });
    }

    await prisma.card.delete({ where: { id } });

    res.json({ message: "Flashcard deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar flashcard:", error);
    res.status(500).json({ error: "Erro ao deletar flashcard" });
  }
};

export const reviewFlashcard = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const { id } = req.params;
    const { isCorrect } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    const updated = await reviewCard(id, userId, isCorrect);

    res.json(updated);

  } catch (error) {
    console.error("Erro na revisão:", error);
    res.status(500).json({ error: error.message });
  }
};
