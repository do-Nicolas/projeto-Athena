
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function main() {
  const userId = "test_user_1";

  const subj = await prisma.subject.create({
    data: {
      userId,
      title: "Matemática",
      color: "#4F46E5",
      description: "Álgebra e Geometria"
    }
  });

  const deck = await prisma.deck.create({
    data: {
      userId,
      title: "Deck Básico - Matemática"
    }
  });

  await prisma.card.createMany({
    data: [
      { deckId: deck.id, front: "2+2", back: "4" },
      { deckId: deck.id, front: "Derivada de x^2", back: "2x" }
    ]
  });

  console.log("Seed completo");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
