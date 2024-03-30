-- AlterTable
ALTER TABLE "Admin" ADD COLUMN "userType" INTEGER;

-- CreateTable
CREATE TABLE "TutorialComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "tutorialElementId" INTEGER NOT NULL,
    CONSTRAINT "TutorialComment_tutorialElementId_fkey" FOREIGN KEY ("tutorialElementId") REFERENCES "TutorialElement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnnonceComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "annonceId" INTEGER NOT NULL,
    CONSTRAINT "AnnonceComment_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "Annonce" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
