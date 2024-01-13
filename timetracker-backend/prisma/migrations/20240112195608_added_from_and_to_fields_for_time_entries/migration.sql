/*
  Warnings:

  - Added the required column `from` to the `TimeEntries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `TimeEntries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeEntries" ADD COLUMN     "from" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL;
