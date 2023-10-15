/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkAccessTokenSettings` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkHasProfileButton` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkIsAppUser` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkIsFavorite` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkIsRecommended` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkLanguage` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkNotificationsEnabled` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vkRef` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

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
    "vkIsRecommended" BOOLEAN NOT NULL,
    "vkHasProfileButton" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isDonator" BOOLEAN NOT NULL DEFAULT false
);
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_vkId_key" ON "User"("vkId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
