// services/reviewService.js
import { prisma } from "../prisma.js";

export async function reviewCard(cardId, userId, isCorrect) {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: {
      deck: {
        include: {
          subject: true,
        }
      }
    }
  });

  if (!card) throw new Error("Card não encontrado");
  if (card.deck.userId !== userId) throw new Error("Sem permissão");

  const today = new Date();
  const deadline = new Date(card.deck.subject.conclusionTime);

  let { repetitions, interval } = card;

  // ---------- Lógica de acerto / erro ----------
  if (!isCorrect) {
    repetitions = 0;
    interval = 0;
  } else {
    repetitions += 1;
    interval = repetitions === 1 ? 1 : Math.ceil(interval * 2);
  }

  // ---------- Próxima dueDate ----------
  let nextDue = new Date();
  nextDue.setHours(0, 0, 0, 0);
  nextDue.setDate(today.getDate() + interval);
  if (nextDue > deadline) nextDue = deadline;

  // 🔥 Atualiza o card normalmente
  const updated = await prisma.card.update({
    where: { id: cardId },
    data: {
      repetitions,
      interval,
      dueDate: nextDue,
      lastReviewed: today
    }
  });

  // 🔥🔥 PRIMEIRA COISA QUE PRECISAMOS IMPLEMENTAR
  // Registrar o review na tabela CardReview
  await prisma.cardReview.create({
    data: {
      cardId,
      userId,
      quality: isCorrect ? 5 : 0,     // 5 = acerto / 0 = erro
      previousEasiness: card.easiness,
      previousRepetitions: card.repetitions,
      previousInterval: card.interval
    }
  });

// ---- LÓGICA DE STREAK ----
const todayDateOnly = new Date();
todayDateOnly.setHours(0,0,0,0);

// pegar user
const user = await prisma.user.findUnique({ where: { id: userId } });

// se não existir → cria (Clerk não cria user no banco automaticamente)
if (!user) {
  await prisma.user.create({
    data: {
      id: userId,
      streak: 1,
      lastStudyDate: todayDateOnly
    }
  });
} else {
  const last = user.lastStudyDate ? new Date(user.lastStudyDate) : null;

  let newStreak = user.streak;

  if (!last) {
    newStreak = 1;
  } else {
    const diff = (todayDateOnly - last) / (1000 * 60 * 60 * 24);

    if (diff === 1) newStreak += 1;      // estudou ontem → +1 streak
    else if (diff > 1) newStreak = 1;    // pulou dias → reset
    else newStreak = user.streak;        // mesmo dia → mantém
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      streak: newStreak,
      lastStudyDate: todayDateOnly
    }
  });
}

// registrar atividade diária
await prisma.dailyStudy.upsert({
  where: {
    userId_date: {
      userId,
      date: todayDateOnly
    }
  },
  update: { reviewed: true },
  create: { userId, date: todayDateOnly, reviewed: true }
});
  

  return updated;
}
