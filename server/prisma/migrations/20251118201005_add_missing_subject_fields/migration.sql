/*
  Warnings:

  - You are about to drop the column `dailyMinutes` on the `StudyPlan` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `StudyPlan` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `StudyPlan` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `StudyPlan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StudyPlan` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the `_StudyPlanToTopic` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `StudyPlan` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `conclusionTime` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Made the column `color` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StudyPlan" DROP CONSTRAINT "StudyPlan_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "_StudyPlanToTopic" DROP CONSTRAINT "_StudyPlanToTopic_A_fkey";

-- DropForeignKey
ALTER TABLE "_StudyPlanToTopic" DROP CONSTRAINT "_StudyPlanToTopic_B_fkey";

-- DropIndex
DROP INDEX "Subject_userId_title_key";

-- AlterTable
ALTER TABLE "Attachment" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "StudyPlan" DROP COLUMN "dailyMinutes",
DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "subjectId",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Subject" DROP COLUMN "title",
DROP COLUMN "userId",
ADD COLUMN     "conclusionTime" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "planId" TEXT NOT NULL,
ALTER COLUMN "color" SET NOT NULL;

-- DropTable
DROP TABLE "_StudyPlanToTopic";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_planId_fkey" FOREIGN KEY ("planId") REFERENCES "StudyPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
