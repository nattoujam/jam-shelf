-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "warnThreshold" INTEGER NOT NULL DEFAULT 3,
    "dangerThreshold" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT,
    CONSTRAINT "Sku_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Sku" ("dangerThreshold", "id", "name", "stock", "unit", "warnThreshold") SELECT "dangerThreshold", "id", "name", "stock", "unit", "warnThreshold" FROM "Sku";
DROP TABLE "Sku";
ALTER TABLE "new_Sku" RENAME TO "Sku";
CREATE UNIQUE INDEX "Sku_userId_name_key" ON "Sku"("userId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
