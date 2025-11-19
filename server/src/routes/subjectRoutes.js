import { Router } from "express";
import { 
  getAllSubjects, 
  createSubject, 
  deleteSubject 
} from "../controllers/subjectController.js";

const router = Router();

router.get("/", getAllSubjects);
router.post("/", createSubject);
router.delete("/:id", deleteSubject);
router.delete("/:id", (req, res, next) => {
  console.log("🔥 ID recebido no DELETE:", req.params.id);
  next();
});

export default router;
