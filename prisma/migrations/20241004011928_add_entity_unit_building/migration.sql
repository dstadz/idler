-- CreateTable
CREATE TABLE "entities" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "units" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "stats" INTEGER NOT NULL,
    "unitType" TEXT NOT NULL,

    CONSTRAINT "units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "techUnlocked" BOOLEAN NOT NULL,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "units_entityId_key" ON "units"("entityId");

-- CreateIndex
CREATE UNIQUE INDEX "buildings_entityId_key" ON "buildings"("entityId");

-- AddForeignKey
ALTER TABLE "units" ADD CONSTRAINT "units_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "entities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
