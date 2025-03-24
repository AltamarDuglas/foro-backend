import { Controller, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comentarios')
export class ComentarioController {
  constructor(private comentarioService: ComentarioService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protegemos la ruta para que solo usuarios autenticados puedan comentar
  async crearComentario(@Body() data: { postId: number; usuarioId: number; texto: string }) {
    return this.comentarioService.crearComentario(data.postId, data.usuarioId, data.texto);
  }

  @Get(':postId')
  async obtenerComentarios(@Param('postId') postId: string) {
    return this.comentarioService.obtenerComentarios(Number(postId));
  }
}
