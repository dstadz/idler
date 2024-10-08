/*
  Warnings:

  - Added the required column `resourceInventoryId` to the `entities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entities" ADD COLUMN     "resourceInventoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "entities" ADD CONSTRAINT "entities_resourceInventoryId_fkey" FOREIGN KEY ("resourceInventoryId") REFERENCES "ResourceInventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
