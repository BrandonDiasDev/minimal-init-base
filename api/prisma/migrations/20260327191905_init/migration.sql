-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "content" VARCHAR(999) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "city" TEXT,
    "country" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
