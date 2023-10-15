-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "vkId" TEXT NOT NULL PRIMARY KEY,
    "vkIsAppUser" TEXT NOT NULL,
    "vkNotificationsEnabled" BOOLEAN NOT NULL,
    "vkLanguage" TEXT NOT NULL,
    "vkRef" TEXT NOT NULL,
    "vkAccessTokenSettings" TEXT NOT NULL,
    "vkIsFavorite" BOOLEAN NOT NULL,
    "vkIsRecommended" BOOLEAN NOT NULL DEFAULT false,
    "vkHasProfileButton" BOOLEAN NOT NULL DEFAULT false,
    "isDonator" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "isDonator", "updatedAt", "vkAccessTokenSettings", "vkHasProfileButton", "vkId", "vkIsAppUser", "vkIsFavorite", "vkIsRecommended", "vkLanguage", "vkNotificationsEnabled", "vkRef") SELECT "createdAt", "isDonator", "updatedAt", "vkAccessTokenSettings", "vkHasProfileButton", "vkId", "vkIsAppUser", "vkIsFavorite", "vkIsRecommended", "vkLanguage", "vkNotificationsEnabled", "vkRef" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_vkId_key" ON "User"("vkId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
