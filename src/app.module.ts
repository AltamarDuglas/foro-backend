import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ForoModule } from './foro/foro.module';
import { ComentarioModule } from './comentario/comentario.module';
import { TemaModule } from './tema/tema.module';

@Module({
  imports: [AuthModule, PrismaModule, ForoModule, ComentarioModule, TemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
