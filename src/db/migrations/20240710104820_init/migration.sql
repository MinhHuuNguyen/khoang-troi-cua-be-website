/*
  Warnings:

  - You are about to drop the column `positionId` on the `MemberRegistration` table. All the data in the column will be lost.
  - You are about to drop the `Position` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `positionLabel` to the `MemberRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MemberRegistration" DROP CONSTRAINT "MemberRegistration_positionId_fkey";

-- AlterTable
ALTER TABLE "MemberRegistration" DROP COLUMN "positionId",
ADD COLUMN     "positionLabel" TEXT NOT NULL;

-- DropTable
DROP TABLE "Position";
