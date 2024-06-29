-- CreateEnum
CREATE TYPE "MemberRegistrationStatus" AS ENUM ('REVIEWING', 'PASSED', 'FAILED');

-- CreateEnum
CREATE TYPE "kindOfDonation" AS ENUM ('MONEY', 'GOODS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberRegistration" (
    "id" SERIAL NOT NULL,
    "status" "MemberRegistrationStatus" NOT NULL DEFAULT 'REVIEWING',
    "fullName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "workPlace" TEXT NOT NULL,
    "hasSocialActivities" BOOLEAN NOT NULL,
    "memories" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "hopeToReceive" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MemberRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DonorRegistration" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kindOfDonation" "kindOfDonation" NOT NULL,
    "donationImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonorRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "MemberRegistration" ADD CONSTRAINT "MemberRegistration_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
