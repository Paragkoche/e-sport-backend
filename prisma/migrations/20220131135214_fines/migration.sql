/*
  Warnings:

  - Added the required column `vidosID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "vidosID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Turnament" (
    "id" TEXT NOT NULL,
    "scroeID" TEXT NOT NULL,
    "gameID" TEXT NOT NULL,
    "Team1ID" TEXT NOT NULL,
    "Team2ID" TEXT NOT NULL,

    CONSTRAINT "Turnament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orgnaser" (
    "id" TEXT NOT NULL,
    "teamsID" TEXT NOT NULL,

    CONSTRAINT "Orgnaser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreBoard" (
    "id" TEXT NOT NULL,
    "json" TEXT NOT NULL,

    CONSTRAINT "ScoreBoard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "descrion" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "shear" TEXT NOT NULL,
    "itStream" BOOLEAN NOT NULL DEFAULT false,
    "likeid" TEXT NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commant" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "commentscommentsID" TEXT NOT NULL,

    CONSTRAINT "Commant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LikeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CommantToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_OrgnaserToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToUser_AB_unique" ON "_LikeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToUser_B_index" ON "_LikeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CommantToUser_AB_unique" ON "_CommantToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommantToUser_B_index" ON "_CommantToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_OrgnaserToTeam_AB_unique" ON "_OrgnaserToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_OrgnaserToTeam_B_index" ON "_OrgnaserToTeam"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_vidosID_fkey" FOREIGN KEY ("vidosID") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnament" ADD CONSTRAINT "Turnament_Team1ID_fkey" FOREIGN KEY ("Team1ID") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnament" ADD CONSTRAINT "Turnament_Team2ID_fkey" FOREIGN KEY ("Team2ID") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnament" ADD CONSTRAINT "Turnament_gameID_fkey" FOREIGN KEY ("gameID") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turnament" ADD CONSTRAINT "Turnament_scroeID_fkey" FOREIGN KEY ("scroeID") REFERENCES "ScoreBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orgnaser" ADD FOREIGN KEY ("teamsID") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_likeid_fkey" FOREIGN KEY ("likeid") REFERENCES "Like"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commant" ADD FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commant" ADD CONSTRAINT "Commant_commentscommentsID_fkey" FOREIGN KEY ("commentscommentsID") REFERENCES "Commant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToUser" ADD FOREIGN KEY ("A") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommantToUser" ADD FOREIGN KEY ("A") REFERENCES "Commant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommantToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgnaserToTeam" ADD FOREIGN KEY ("A") REFERENCES "Orgnaser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgnaserToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
