-- CreateTable
CREATE TABLE "Eliminacion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "entidadId" INTEGER NOT NULL,
    "motivo" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Eliminacion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Eliminacion" ADD CONSTRAINT "Eliminacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
