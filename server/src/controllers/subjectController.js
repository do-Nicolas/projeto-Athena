import { prisma } from "../prisma.js";

export const getAllSubjects = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    let subjects;

    if (userId) {
      subjects = await prisma.subject.findMany({
        where: { userId },
        include: {
          decks: true,
        },
      });
    } else {
      console.warn("⚠️ Nenhum userId enviado — retornando todas as matérias (modo debug)");
      subjects = await prisma.subject.findMany({
        include: {
          decks: true,
        },
      });
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

    // 🔹 1 — Criar a matéria
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

    // 🔹 2 — Criar automaticamente um deck vinculado a essa matéria
    const deck = await prisma.deck.create({
      data: {
        userId,
        subjectId: subject.id,
      },
    });

    console.log("📦 Deck criado automaticamente:", deck);

    // 🔹 3 — Retornar a matéria e o deck criado
    res.status(201).json({
      subject,
      deck,
    });

  } catch (error) {
    console.error("❌ Erro no createSubject:", error);
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