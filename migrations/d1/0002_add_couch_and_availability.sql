-- CreateTable
CREATE TABLE "Couch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Couch_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CouchAvailability" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "couchId" TEXT NOT NULL,
    "availableDate" DATETIME NOT NULL,
    CONSTRAINT "CouchAvailability_couchId_fkey" FOREIGN KEY ("couchId") REFERENCES "Couch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
