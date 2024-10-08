/*
  Warnings:

  - You are about to drop the `buildings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `entities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `units` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[entityId]` on the table `ResourceInventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `entityId` to the `ResourceInventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "buildings" DROP CONSTRAINT "buildings_entityId_fkey";

-- DropForeignKey
ALTER TABLE "entities" DROP CONSTRAINT "entities_resourceInventoryId_fkey";

-- DropForeignKey
ALTER TABLE "entities" DROP CONSTRAINT "entities_userId_fkey";

-- DropForeignKey
ALTER TABLE "units" DROP CONSTRAINT "units_entityId_fkey";

-- AlterTable
ALTER TABLE "ResourceInventory" ADD COLUMN     "entityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "buildings";

-- DropTable
DROP TABLE "entities";

-- DropTable
DROP TABLE "units";

-- CreateTable
CREATE TABLE "Building" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "xPos" DOUBLE PRECISION NOT NULL,
    "yPos" DOUBLE PRECISION NOT NULL,
    "level" INTEGER NOT NULL,
    "techUnlocked" BOOLEAN NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL,
    "resourceInventoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "stats" INTEGER NOT NULL,
    "unitType" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Building_entityId_key" ON "Building"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_entityId_key" ON "Unit"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceInventory_entityId_key" ON "ResourceInventory"("entityId");

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_resourceInventoryId_fkey" FOREIGN KEY ("resourceInventoryId") REFERENCES "ResourceInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entity" ADD CONSTRAINT "Entity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
