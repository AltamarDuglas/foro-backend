-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_temaId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
