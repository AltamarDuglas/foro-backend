import { Controller, Post, Get, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TemaService } from './tema.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('temas')
export class TemaController {
  constructor(private temaService: TemaService) {}

  // Crear un tema
  @UseGuards(JwtAuthGuard)
  @Post()
  crearTema(@Body() data: { foroId: number; usuarioId: number; titulo: string }) {
    return this.temaService.crearTema(data.foroId, data.usuarioId, data.titulo);
  }

  // Obtener todos los temas por foro
  @Get('foro/:foroId')
  obtenerTemas(@Param('foroId') foroId: string) {
    return this.temaService.obtenerTemasPorForo(Number(foroId));
  }

  // Obtener todos los posts de un tema
  @UseGuards(JwtAuthGuard)
  @Get(':id/posts')
  async obtenerPostsDelTema(@Param('id') id: string) {
    const posts = await this.temaService.obtenerPostsPorTema(Number(id));
    const tema = await this.temaService.obtenerTemaPorId(Number(id));
    return { posts, temaTitulo: tema?.titulo, temaCreadorId: tema?.usuarioId };
  }

  // Eliminar tema (solo moderador o admin)
  @UseGuards(JwtAuthGuard)
  @Post(':id/eliminar')
  eliminarTema(@Param('id') id: string, @Req() req: any) {
    return this.temaService.eliminarTema(
      Number(id),
      req.user.id,
      req.user.rol,
    );
  }
}
