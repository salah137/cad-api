/*
  Warnings:

  - Added the required column `image` to the `Tutorial` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tutorial" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Tutorial" ("description", "id", "title", "topic") SELECT "description", "id", "title", "topic" FROM "Tutorial";
DROP TABLE "Tutorial";
ALTER TABLE "new_Tutorial" RENAME TO "Tutorial";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
