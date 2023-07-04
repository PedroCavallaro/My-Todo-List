-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "statusId" TEXT NOT NULL DEFAULT '4e7b0462-c58a-472d-98b2-5467c53a2420',
    "userId" TEXT NOT NULL,
    CONSTRAINT "ToDo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ToDoStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ToDo" ("description", "id", "statusId", "userId") SELECT "description", "id", "statusId", "userId" FROM "ToDo";
DROP TABLE "ToDo";
ALTER TABLE "new_ToDo" RENAME TO "ToDo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
