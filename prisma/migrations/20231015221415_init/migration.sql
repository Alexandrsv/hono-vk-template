-- CreateTable
CREATE TABLE "User" (
    "vkId" TEXT NOT NULL,
    "vkIsAppUser" TEXT NOT NULL,
    "vkNotificationsEnabled" BOOLEAN NOT NULL,
    "vkLanguage" TEXT NOT NULL,
    "vkRef" TEXT NOT NULL,
    "vkAccessTokenSettings" TEXT NOT NULL,
    "vkIsFavorite" BOOLEAN NOT NULL,
    "vkIsRecommended" BOOLEAN NOT NULL DEFAULT false,
    "vkHasProfileButton" BOOLEAN NOT NULL DEFAULT false,
    "isDonator" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("vkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_vkId_key" ON "User"("vkId");
