/*
  Warnings:

  - You are about to drop the `DownloadVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DownloadVerification" DROP CONSTRAINT "DownloadVerification_productId_fkey";

-- DropTable
DROP TABLE "DownloadVerification";
