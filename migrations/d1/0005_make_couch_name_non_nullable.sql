-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Couch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Couch_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Couch" ("createdAt", "description", "hostId", "id", "location", "name", "price", "updatedAt") SELECT "createdAt", "description", "hostId", "id", "location", "name", "price", "updatedAt" FROM "Couch";
DROP TABLE "Couch";
ALTER TABLE "new_Couch" RENAME TO "Couch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
