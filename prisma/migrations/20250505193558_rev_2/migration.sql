/*
  Warnings:

  - You are about to drop the column `pricePaidInCents` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailableForPurchase` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceInCents` on the `Product` table. All the data in the column will be lost.
  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "pricePaidInCents",
ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isAvailableForPurchase",
DROP COLUMN "priceInCents",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "price" INTEGER NOT NULL;
