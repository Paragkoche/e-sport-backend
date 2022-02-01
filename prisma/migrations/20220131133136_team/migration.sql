-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "totalIncom" BIGINT NOT NULL DEFAULT 0,
    "isGammer" BOOLEAN NOT NULL DEFAULT false,
    "followerID" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "download_link" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "total_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "leaderId" TEXT NOT NULL,
    "mamberId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_mamber" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_mamber_AB_unique" ON "_mamber"("A", "B");

-- CreateIndex
CREATE INDEX "_mamber_B_index" ON "_mamber"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_followerID_fkey" FOREIGN KEY ("followerID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_leaderId_fkey" FOREIGN KEY ("leaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("mamberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mamber" ADD FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_mamber" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
