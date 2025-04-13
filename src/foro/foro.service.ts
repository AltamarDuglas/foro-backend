import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ForoService {
  constructor(private prisma: PrismaService) {}

  getForos() {
    return this.prisma.foro.findMany();
  }

  createForo(data: { titulo: string; descripcion?: string }) {
    return this.prisma.foro.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
      },
    });
  }
  eliminarForo(foroId: number) {
    return this.prisma.foro.delete({
      where: { id: foroId },
    });
  }
  
  

  getPosts() {
    return this.prisma.post.findMany({
      orderBy: { id: 'desc' },
      include: {
        usuario: { select: { id: true, nombre: true } },
        tema: {
          include: {
            foro: { select: { id: true, titulo: true } },
          },
        },
        comentarios: {
          include: {
            usuario: { select: { nombre: true } },
          },
          orderBy: { id: 'asc' },
        },
        likes: true,
      },
    });
  }

  getPost(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        usuario: {
          select: { id: true, nombre: true, email: true },
        },
        tema: {
          include: {
            foro: true,
          },
        },
        comentarios: {
          orderBy: { id: 'asc' },
          include: {
            usuario: {
              select: { id: true, nombre: true, email: true },
            },
          },
        },
        likes: {
          select: { usuarioId: true },
        },
      },
    });
  }

  // ✅ Validación: solo el creador del tema puede publicar
  async crearPost(data: { texto: string; imagen: string; usuarioId: number; temaId: number }) {
    const tema = await this.prisma.tema.findUnique({
      where: { id: data.temaId },
    });
  
    if (!tema) throw new Error('Tema no encontrado');
    if (tema.usuarioId !== Number(data.usuarioId)) {
      throw new Error('Solo el creador del tema puede publicar posts en él');
    }
  
    return this.prisma.post.create({
      data: {
        texto: data.texto,
        imagen: data.imagen,
        usuario: { connect: { id: Number(data.usuarioId) } },
        tema: { connect: { id: data.temaId } },
      },
    });
  }
  
  getUsuarioById(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  crearComentario(data: { texto: string; postId: number; usuarioId: number }) {
    return this.prisma.comentario.create({
      data: {
        texto: data.texto,
        post: { connect: { id: data.postId } },
        usuario: { connect: { id: data.usuarioId } },
      },
      include: {
        usuario: { select: { nombre: true } },
      },
    });
  }

  // ❤️ Agregar like con control de error único
  async darLike(postId: number, usuarioId: number) {
    try {
      return await this.prisma.like.create({
        data: {
          postId,
          usuarioId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        return { mensaje: 'Ya existe el like (duplicado ignorado)' };
      }
      throw error;
    }
  }

  // 💔 Quitar like
  async quitarLike(postId: number, usuarioId: number) {
    return this.prisma.like.delete({
      where: {
        postId_usuarioId: { postId, usuarioId },
      },
    });
  }

  // 🔢 Contar likes
  async contarLikes(postId: number) {
    return this.prisma.like.count({
      where: { postId },
    });
  }

  async obtenerPerfilDeUsuario(usuarioId: number) {
    return this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: {
        id: true,
        nombre: true,
        email: true,
        temas: {
          select: {
            id: true,
            titulo: true,
            foro: {
              select: {
                id: true,
                titulo: true,
              },
            },
          },
          orderBy: { creadoEn: 'desc' },
        },
      },
    });
  }

  async eliminarPost(postId: number, usuarioId: number, usuarioRol: string) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) throw new Error('Post no encontrado');

    const esAutor = post.usuarioId === usuarioId;
    const esMod = usuarioRol === 'moderador' || usuarioRol === 'admin';

    if (!esAutor && !esMod) {
      throw new Error('No autorizado para eliminar este post');
    }

    if (!esAutor) {
      await this.prisma.eliminacion.create({
        data: {
          usuarioId,
          tipo: 'post',
          entidadId: postId,
        },
      });
    }

    return this.prisma.post.delete({ where: { id: postId } });
  }

  getPostsByForoId(foroId: number) {
    return this.prisma.post.findMany({
      where: {
        tema: {
          foroId,
        },
      },
      include: {
        usuario: { select: { id: true, nombre: true } },
        comentarios: {
          include: {
            usuario: { select: { nombre: true } },
          },
          orderBy: { id: 'asc' },
        },
        tema: { select: { titulo: true } },
        likes: true,
      },
      orderBy: { id: 'desc' },
    });
  }
}
