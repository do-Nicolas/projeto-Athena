/*
  Warnings:

  - You are about to drop the column `topicId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `topicId` on the `SessionItem` table. All the data in the column will be lost.
  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subjectId` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_topicId_fkey";

-- DropForeignKey
ALTER TABLE "SessionItem" DROP CONSTRAINT "SessionItem_topicId_fkey";

-- DropForeignKey
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_subjectId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "topicId";

-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SessionItem" DROP COLUMN "topicId";

-- DropTable
DROP TABLE "Topic";

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
