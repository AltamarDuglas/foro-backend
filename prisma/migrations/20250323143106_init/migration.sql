/*
  Warnings:

  - You are about to drop the column `foroId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `temaId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_foroId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "foroId",
ADD COLUMN     "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "temaId" INTEGER NOT NULL,
ALTER COLUMN "imagen" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Tema" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "foroId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_foroId_fkey" FOREIGN KEY ("foroId") REFERENCES "Foro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tema" ADD CONSTRAINT "Tema_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
