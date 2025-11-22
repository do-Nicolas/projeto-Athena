import { prisma } from "../prisma.js";

export const getAllSubjects = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    let subjects;

    if (userId) {
      // 🔥 Normal: buscar matérias do usuário logado
      subjects = await prisma.subject.findMany({
        where: { userId },
      });
    } else {
      // 👀 Modo DEBUG: permite acessar pelo navegador
      console.warn("⚠️ Nenhum userId enviado — retornando todas as matérias (modo debug)");
      subjects = await prisma.subject.findMany(); // sem filtro
    }

    res.json(subjects);
  } catch (error) {
    console.error("Erro no getAllSubjects:", error);
    res.status(500).json({ error: "Erro ao buscar matérias" });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, description, conclusionTime, color, planId, userId } = req.body;
    console.log("📥 Body recebido:", req.body);

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    const subject = await prisma.subject.create({
      data: {
        name,
        description,
        conclusionTime,
        color,
        planId,
        userId,
      },
    });

    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: "Erro no Prisma", details: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🗑️ Tentando excluir ID:", id);

    const deleted = await prisma.subject.delete({
      where: { id },
    });

    console.log("✔️ Deletado:", deleted);
    res.json({ message: "Matéria excluída com sucesso" });
  } catch (error) {
    console.error("❌ ERRO AO DELETAR:", error);
    res.status(500).json({
      error: "Erro ao deletar matéria",
      message: error.message,
    });
  }
};
