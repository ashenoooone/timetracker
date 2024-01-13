/*
  Warnings:

  - You are about to drop the column `verified` on the `EmailVerifications` table. All the data in the column will be lost.
  - You are about to drop the column `confirmed` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmailVerifications" DROP COLUMN "verified",
ADD COLUMN     "_v" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "confirmed",
ADD COLUMN     "_v" BOOLEAN NOT NULL DEFAULT false;
