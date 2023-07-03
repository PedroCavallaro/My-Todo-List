-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ToDo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ToDo_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ToDoStatus" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ToDo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ToDoStatus" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL
);
