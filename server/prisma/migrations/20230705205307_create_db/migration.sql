-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "picture" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "sub" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "statusId" TEXT NOT NULL DEFAULT '4e7b0462-c58a-472d-98b2-5467c53a2420',
    "userId" TEXT NOT NULL,
    CONSTRAINT "ToDo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ToDoStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToDoStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);
