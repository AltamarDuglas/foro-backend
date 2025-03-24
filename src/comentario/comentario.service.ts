import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ComentarioService {
  constructor(private prisma: PrismaService) {}

  async crearComentario(postId: number, usuarioId: number, texto: string) {
    return this.prisma.comentario.create({
      data: {
        postId,
        usuarioId,
        texto,
      },
    });
  }

  async obtenerComentarios(postId: number) {
    return this.prisma.comentario.findMany({
      where: { postId },
      include: { usuario: { select: { nombre: true } } },
    });
  }
}
