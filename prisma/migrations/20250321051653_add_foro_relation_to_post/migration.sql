/*
  Warnings:

  - You are about to drop the column `creadoEn` on the `Comentario` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `Usuario` table. All the data in the column will be lost.
  - Made the column `texto` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comentario" DROP COLUMN "creadoEn";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "creadoEn",
ALTER COLUMN "texto" SET NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "creadoEn";
