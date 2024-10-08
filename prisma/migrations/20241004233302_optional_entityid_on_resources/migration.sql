/*
  Warnings:

  - A unique constraint covering the columns `[resourceInventoryId]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ResourceInventory" ALTER COLUMN "entityId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Entity_resourceInventoryId_key" ON "Entity"("resourceInventoryId");
