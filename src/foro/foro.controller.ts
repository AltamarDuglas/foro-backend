import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req,
  UnauthorizedException,
  Param,
  Delete,
} from '@nestjs/common';
import { ForoService } from './foro.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('foro')
export class ForoController {
  constructor(private readonly foroService: ForoService) {}

  // 🔐 Proteger todas las rutas con JWT
  @UseGuards(JwtAuthGuard)
  @Get('foros')
  getForos() {
    return this.foroService.getForos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('foro/:id/posts')
  getPostsDeForo(@Param('id') id: string) {
    return this.foroService.getPostsByForoId(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createForo(
    @Body() body: { titulo: string; descripcion?: string },
    @Req() req: any
  ) {
    const usuario = await this.foroService.getUsuarioById(req.user.id);

    if (!usuario || (usuario.rol !== 'moderador' && usuario.rol !== 'admin')) {
      throw new UnauthorizedException('Solo los moderadores pueden crear foros');
    }

    return this.foroService.createForo(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil/:id')
  getPerfil(@Param('id') id: string) {
    return this.foroService.obtenerPerfilDeUsuario(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post('post/:id/eliminar')
  eliminarPost(@Param('id') id: string, @Req() req: any) {
    return this.foroService.eliminarPost(
      Number(id),
      req.user.id,
      req.user.rol,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  getPosts() {
    return this.foroService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('post')
  @UseInterceptors(FileInterceptor('imagen', { dest: './uploads' }))
  async crearPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { texto: string; temaId: number },
    @Req() req: any,
  ) {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return this.foroService.crearPost({
      texto: body.texto,
      imagen: file.filename,
      usuarioId,
      temaId: Number(body.temaId),
    });
  }

  // ❤️ Dar like
  @UseGuards(JwtAuthGuard)
  @Post('post/:id/like')
  darLike(@Param('id') postId: string, @Req() req: any) {
    return this.foroService.darLike(Number(postId), req.user.id);
  }

  // 💔 Quitar like
  @UseGuards(JwtAuthGuard)
  @Post('post/:id/unlike')
  quitarLike(@Param('id') postId: string, @Req() req: any) {
    return this.foroService.quitarLike(Number(postId), req.user.id);
  }

  // 🔢 Obtener cantidad de likes de un post
  @UseGuards(JwtAuthGuard)
  @Get('post/:id/likes')
  contarLikes(@Param('id') postId: string) {
    return this.foroService.contarLikes(Number(postId));
  }
  @UseGuards(JwtAuthGuard)
@Post('comentario')
crearComentario(@Body() body: { texto: string; postId: number; usuarioId: number }) {
  return this.foroService.crearComentario(body);
}

}
