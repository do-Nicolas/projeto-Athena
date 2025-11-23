// routes/deckRoutes.js
import express from "express";
import {
  getAllDecks,
  createDeck,
  getFlashcardsFromDeck,
  deleteDeck
} from "../controllers/deckController.js";

const router = express.Router();

// Listar todos os decks do usuário
router.get("/", getAllDecks);

// Criar deck
router.post("/", createDeck);

// Listar todos os flashcards de um deck
router.get("/:deckId/cards", getFlashcardsFromDeck);
router.get("/by-subject/:subjectId", getDeckBySubject);


// Deletar deck
router.delete("/:deckId", deleteDeck);

export default router;
