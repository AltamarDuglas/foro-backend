import { Module } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { ComentarioController } from './comentario.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ Importamos PrismaModule

@Module({
  imports: [PrismaModule], // ✅ Aseguramos que Prisma está disponible en ComentarioModule
  controllers: [ComentarioController],
  providers: [ComentarioService],
})
export class ComentarioModule {}
