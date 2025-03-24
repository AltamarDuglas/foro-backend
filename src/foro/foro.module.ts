import { Module } from '@nestjs/common';
import { ForoService } from './foro.service';
import { ForoController } from './foro.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ Importamos PrismaModule

@Module({
  imports: [PrismaModule], // ✅ Aseguramos que Prisma está disponible en ForoModule
  controllers: [ForoController],
  providers: [ForoService],
})
export class ForoModule {}
