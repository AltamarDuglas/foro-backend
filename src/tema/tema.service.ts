import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TemaService {
  constructor(private prisma: PrismaService) {}

  async crearTema(foroId: number, usuarioId: number, titulo: string) {
    return this.prisma.tema.create({
      data: {
        foroId,
        usuarioId,
        titulo,
      },
    });
  }

  async obtenerPostsPorTema(temaId: number) {
    return this.prisma.post.findMany({
      where: { temaId },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
          },
        },
        comentarios: {
          include: {
            usuario: {
              select: { nombre: true },
            },
          },
          orderBy: { id: 'asc' },
        },
        likes: {
          select: { usuarioId: true },
        },
      },
      orderBy: { creadoEn: 'asc' },
    });
  }

  async obtenerTemaPorId(id: number) {
    return this.prisma.tema.findUnique({
      where: { id },
      select: { titulo: true, usuarioId: true }, // <--- incluye usuarioId aquí
    });
  }
  

  async obtenerTemasPorForo(foroId: number) {
    return this.prisma.tema.findMany({
      where: { foroId },
      include: {
        usuario: { select: { nombre: true } },
        posts: { select: { id: true } },
      },
      orderBy: { creadoEn: 'desc' },
    });
  }

  async eliminarTema(temaId: number, usuarioId: number, usuarioRol: string) {
    if (usuarioRol !== 'moderador' && usuarioRol !== 'admin') {
      throw new Error('No autorizado');
    }

    try {
      await this.prisma.eliminacion.create({
        data: {
          usuarioId,
          tipo: 'tema',
          entidadId: temaId,
        },
      });

      return this.prisma.tema.delete({ where: { id: temaId } });
    } catch (error) {
      console.error('[ERROR al eliminar tema]', error);
      throw new Error('Error al eliminar el tema');
    }
  }
  
}
