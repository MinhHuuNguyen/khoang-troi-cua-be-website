/*
  Warnings:

  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `work_place` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_number",
DROP COLUMN "work_place",
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "workPlace" TEXT;
