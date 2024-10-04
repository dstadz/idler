/*
  Warnings:

  - You are about to drop the column `position` on the `buildings` table. All the data in the column will be lost.
  - Added the required column `resources` to the `buildings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `buildings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xPos` to the `buildings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yPos` to the `buildings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "buildings" DROP COLUMN "position",
ADD COLUMN     "resources" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "xPos" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "yPos" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "ResourceInventory" (
    "id" TEXT NOT NULL,
    "wood" INTEGER NOT NULL DEFAULT 0,
    "stone" INTEGER NOT NULL DEFAULT 0,
    "iron" INTEGER NOT NULL DEFAULT 0,
    "food" INTEGER NOT NULL DEFAULT 0,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "power" INTEGER NOT NULL DEFAULT 0,
    "energy" INTEGER NOT NULL DEFAULT 0,
    "water" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ResourceInventory_pkey" PRIMARY KEY ("id")
);
