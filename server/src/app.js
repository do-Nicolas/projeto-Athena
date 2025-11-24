import express from "express";
import cors from "cors";
import subjectRoutes from "./routes/subjectRoutes.js";
import flashcardRoutes from "./routes/flashcardRoutes.js";
import deckRoutes from "./routes/deckRoutes.js";
import studyRoutes from "./routes/studyRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/subjects", subjectRoutes);
app.use("/flashcards", flashcardRoutes);
app.use("/decks", deckRoutes);
app.use("/study", studyRoutes);
export default app;
