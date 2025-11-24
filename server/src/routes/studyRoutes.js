import express from "express";
import { registerStudyDay } from "../controllers/studyController.js";

const router = express.Router();

// registra o estudo de HOJE
router.post("/day", registerStudyDay);

export default router;
