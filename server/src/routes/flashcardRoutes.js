import express from "express";
import {
  getAllFlashcards,
  createFlashcard,
  deleteFlashcard,
  reviewFlashcard
} from "../controllers/flashcardController.js";

const router = express.Router();

router.get("/", getAllFlashcards);
router.post("/", createFlashcard);
router.delete("/:id", deleteFlashcard);
router.post("/:id/review", reviewFlashcard); // ← AQUI

export default router;
