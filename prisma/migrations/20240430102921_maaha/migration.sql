-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TutorialElement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "views" INTEGER NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tutorialId" INTEGER,
    CONSTRAINT "TutorialElement_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "Tutorial" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TutorialElement" ("description", "files", "id", "image", "time", "title", "tutorialId", "video", "views") SELECT "description", "files", "id", "image", "time", "title", "tutorialId", "video", "views" FROM "TutorialElement";
DROP TABLE "TutorialElement";
ALTER TABLE "new_TutorialElement" RENAME TO "TutorialElement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
