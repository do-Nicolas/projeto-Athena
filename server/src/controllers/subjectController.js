import { prisma } from "../prisma.js";


export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    console.log("Subjects encontrados:", subjects); // <--- ADICIONE ISSO
    res.json(subjects);
  } catch (error) {
    console.error("Erro no getAllSubjects:", error); // <--- ADICIONE ISSO
    res.status(500).json({ error: "Erro ao buscar matérias" });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, description, conclusion_time, color, plan_id } = req.body;

    console.log("REQ RECEBIDO PELO CONTROLLER:", req.body);

    const subject = await prisma.subject.create({
      data: {
        name,
        description,
        conclusionTime: conclusion_time,
        color,
        planId: plan_id,
      },
    });

    res.json(subject);

  } catch (error) {
    console.error("⚠️ ERRO PRISMA COMPLETO:");
    console.error(error);

    res.status(500).json({
      error: "Erro no Prisma",
      message: error.message,
      meta: error.meta,
    });
  }
};


