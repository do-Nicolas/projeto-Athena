-- CreateTable
CREATE TABLE "DailyStudy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DailyStudy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "lastStudyDate" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyStudy_userId_date_key" ON "DailyStudy"("userId", "date");

-- AddForeignKey
ALTER TABLE "DailyStudy" ADD CONSTRAINT "DailyStudy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
