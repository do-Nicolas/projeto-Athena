import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const subjects = await prisma.subject.findMany();
  console.log("Subjects:", subjects);

  const cards = await prisma.card.findMany({ take: 5 });
  console.log("Cards:", cards);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
