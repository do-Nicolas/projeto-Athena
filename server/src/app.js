import express from "express";
import cors from "cors";
import subjectRoutes from "./routes/subjectRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import deckRoutes from "./routes/deckRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
import statisticsRoutes from "./routes/statisticsRoutes.js";  // ⭐ ADICIONE

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/subjects", subjectRoutes);
app.use("/flashcards", flashcardRoutes);
app.use("/decks", deckRoutes);
app.use("/study", studyRoutes);
app.use("/statistics", statisticsRoutes);  // ⭐ ADICIONE → isso ativa GET /api/statistics

export default app;
