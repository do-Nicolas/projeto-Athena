import { prisma } from "../prisma.js";

export async function registerStudyDay(req, res) {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      return res.status(400).json({ error: "User ID não enviado" });
    }

    const today = new Date();
    const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Buscar último registro do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const lastDate = user.lastStudyDate
      ? new Date(user.lastStudyDate)
      : null;

    let streak = user.streak;

    // ---------- CÁLCULO DO STREAK ----------
    if (!lastDate) {
      streak = 1; // primeiro dia
    } else {
      const last = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
      const diff = (todayDateOnly - last) / (1000 * 60 * 60 * 24);

      if (diff === 1) streak += 1;        // continuou
      else if (diff > 1) streak = 1;      // perdeu o streak
      // diff === 0 → mesmo dia → não muda
    }

    // ---------- CRIAR/ATUALIZAR REGISTRO DIÁRIO ----------
    await prisma.dailyStudy.upsert({
      where: {
        userId_date: {
          userId,
          date: todayDateOnly
        }
      },
      update: { reviewed: true },
      create: {
        userId,
        date: todayDateOnly,
        reviewed: true
      }
    });

    // ---------- SALVAR STREAK ----------
    await prisma.user.update({
      where: { id: userId },
      data: {
        streak,
        lastStudyDate: todayDateOnly
      }
    });

    return res.json({
      message: "Dia de estudo registrado!",
      streak
    });

  } catch (err) {
    console.error("Erro ao registrar estudo:", err);
    res.status(500).json({ error: "Erro ao registrar estudo" });
  }
}
