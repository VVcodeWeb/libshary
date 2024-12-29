/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ShelfBook` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MetadataBook` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[shelfId,bookId,status]` on the table `ShelfBook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `ShelfBook` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAST_READ', 'FUTURE_READ', 'IN_PROGRESS');

-- DropForeignKey
ALTER TABLE "MetadataBook" DROP CONSTRAINT "MetadataBook_shelfBookId_fkey";

-- DropForeignKey
ALTER TABLE "ShelfBook" DROP CONSTRAINT "ShelfBook_categoryId_fkey";

-- DropIndex
DROP INDEX "ShelfBook_shelfId_bookId_categoryId_key";

-- AlterTable
ALTER TABLE "ShelfBook" DROP COLUMN "categoryId",
ADD COLUMN     "status" "Status" NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "MetadataBook";

-- CreateTable
CREATE TABLE "InProgressShelfBook" (
    "shelfBookId" INTEGER NOT NULL,
    "currentPage" INTEGER NOT NULL,

    CONSTRAINT "InProgressShelfBook_pkey" PRIMARY KEY ("shelfBookId")
);

-- CreateTable
CREATE TABLE "FutureReadShelfBook" (
    "shelfBookId" INTEGER NOT NULL,

    CONSTRAINT "FutureReadShelfBook_pkey" PRIMARY KEY ("shelfBookId")
);

-- CreateTable
CREATE TABLE "PastReadShelfBook" (
    "shelfBookId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "PastReadShelfBook_pkey" PRIMARY KEY ("shelfBookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "InProgressShelfBook_shelfBookId_key" ON "InProgressShelfBook"("shelfBookId");

-- CreateIndex
CREATE UNIQUE INDEX "FutureReadShelfBook_shelfBookId_key" ON "FutureReadShelfBook"("shelfBookId");

-- CreateIndex
CREATE UNIQUE INDEX "PastReadShelfBook_shelfBookId_key" ON "PastReadShelfBook"("shelfBookId");

-- CreateIndex
CREATE UNIQUE INDEX "ShelfBook_shelfId_bookId_status_key" ON "ShelfBook"("shelfId", "bookId", "status");

-- AddForeignKey
ALTER TABLE "InProgressShelfBook" ADD CONSTRAINT "InProgressShelfBook_shelfBookId_fkey" FOREIGN KEY ("shelfBookId") REFERENCES "ShelfBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FutureReadShelfBook" ADD CONSTRAINT "FutureReadShelfBook_shelfBookId_fkey" FOREIGN KEY ("shelfBookId") REFERENCES "ShelfBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastReadShelfBook" ADD CONSTRAINT "PastReadShelfBook_shelfBookId_fkey" FOREIGN KEY ("shelfBookId") REFERENCES "ShelfBook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
