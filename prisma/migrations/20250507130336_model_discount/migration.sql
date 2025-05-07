/*
  Warnings:

  - You are about to drop the column `discountCodeId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `DiscountCode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiscountCodeToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_discountCodeId_fkey";

-- DropForeignKey
ALTER TABLE "_DiscountCodeToProduct" DROP CONSTRAINT "_DiscountCodeToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_DiscountCodeToProduct" DROP CONSTRAINT "_DiscountCodeToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discountCodeId",
ADD COLUMN     "discountId" TEXT;

-- DropTable
DROP TABLE "DiscountCode";

-- DropTable
DROP TABLE "_DiscountCodeToProduct";

-- DropEnum
DROP TYPE "DiscountCodeType";

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "allProducts" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "limit" INTEGER,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DiscountToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DiscountToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Discount_code_key" ON "Discount"("code");

-- CreateIndex
CREATE INDEX "_DiscountToProduct_B_index" ON "_DiscountToProduct"("B");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToProduct" ADD CONSTRAINT "_DiscountToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Discount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiscountToProduct" ADD CONSTRAINT "_DiscountToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
