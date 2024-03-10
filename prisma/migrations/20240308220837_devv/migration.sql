/*
  Warnings:

  - Added the required column `title` to the `TutorialElement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TutorialElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tutorialId" INTEGER,
    CONSTRAINT "TutorialElement_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TutorialElement" ("description", "files", "id", "time", "views") SELECT "description", "files", "id", "time", "views" FROM "TutorialElement";
DROP TABLE "TutorialElement";
ALTER TABLE "new_TutorialElement" RENAME TO "TutorialElement";
CREATE TABLE "new_Tutorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL
);
INSERT INTO "new_Tutorial" ("description", "id", "title") SELECT "description", "id", "title" FROM "Tutorial";
DROP TABLE "Tutorial";
ALTER TABLE "new_Tutorial" RENAME TO "Tutorial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
