-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_temaId_fkey";

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Like_postId_usuarioId_key" ON "Like"("postId", "usuarioId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
