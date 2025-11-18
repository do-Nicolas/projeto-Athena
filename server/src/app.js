import express from "express";
import cors from "cors";
import subjectRoutes from "./routes/subjectRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/api/subjects", subjectRoutes);

export default app;
