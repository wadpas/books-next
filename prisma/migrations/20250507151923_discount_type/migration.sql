/*
  Warnings:

  - You are about to drop the column `discountType` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `type` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "discountType",
ADD COLUMN     "type" "DiscountType" NOT NULL;
