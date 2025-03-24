import { Module } from '@nestjs/common';
import { TemaService } from './tema.service';
import { TemaController } from './tema.controller';
import { PrismaModule } from '../prisma/prisma.module'; // importa PrismaModule

@Module({
  imports: [PrismaModule], // ✅ importa el módulo
  providers: [TemaService],
  controllers: [TemaController],
})
export class TemaModule {}
