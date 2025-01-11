/*
  Warnings:

  - You are about to drop the `FutureReadShelfBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InProgressShelfBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PastReadShelfBook` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShelfBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FutureReadShelfBook" DROP CONSTRAINT "FutureReadShelfBook_shelfBookId_fkey";

-- DropForeignKey
ALTER TABLE "InProgressShelfBook" DROP CONSTRAINT "InProgressShelfBook_shelfBookId_fkey";

-- DropForeignKey
ALTER TABLE "PastReadShelfBook" DROP CONSTRAINT "PastReadShelfBook_shelfBookId_fkey";

-- DropForeignKey
ALTER TABLE "ShelfBook" DROP CONSTRAINT "ShelfBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ShelfBook" DROP CONSTRAINT "ShelfBook_shelfId_fkey";

-- AlterTable
ALTER TABLE "Shelf" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "FutureReadShelfBook";

-- DropTable
DROP TABLE "InProgressShelfBook";

-- DropTable
DROP TABLE "PastReadShelfBook";

-- DropTable
DROP TABLE "ShelfBook";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shelfId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionBook" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColorPalette" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "ColorPalette_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_shelfId_key" ON "Section"("name", "shelfId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionBook_sectionId_bookId_key" ON "SectionBook"("sectionId", "bookId");

-- CreateIndex
CREATE INDEX "Book_googleBookId_idx" ON "Book"("googleBookId");

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_shelfId_fkey" FOREIGN KEY ("shelfId") REFERENCES "Shelf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionBook" ADD CONSTRAINT "SectionBook_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionBook" ADD CONSTRAINT "SectionBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
