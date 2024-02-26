/*
  Warnings:

  - You are about to drop the column `twittId` on the `Bookmark` table. All the data in the column will be lost.
  - You are about to drop the `Twitt` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tweetId` to the `Bookmark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_twittId_fkey";

-- DropForeignKey
ALTER TABLE "Twitt" DROP CONSTRAINT "Twitt_authorId_fkey";

-- DropIndex
DROP INDEX "Bookmark_userId_twittId_key";

-- AlterTable
ALTER TABLE "Bookmark" DROP COLUMN "twittId",
ADD COLUMN     "tweetId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Twitt";

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_tweetId_key" ON "Bookmark"("userId", "tweetId");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
