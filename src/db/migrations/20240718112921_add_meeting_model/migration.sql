-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "linkMaps" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);
