import { prisma } from "../prisma.js";

export async function getStatistics(req, res) {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    // 1 – Flashcards resolvidos
    const flashcardsResolvidos = await prisma.cardReview.count({
      where: { userId }
    });

    // 2 – Streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true }
    });

    const streak = user?.streak ?? 0;

    // 3 – Média de erros
    const erros = await prisma.cardReview.count({
      where: { userId, quality: 0 }
    });

    const totalReviews = await prisma.cardReview.count({
      where: { userId }
    });

    const mediaErros = totalReviews > 0
      ? Math.round((erros / totalReviews) * 100)
      : 0;

    return res.json({
      flashcardsResolvidos,
      streak,
      mediaErros
    });

  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
}
