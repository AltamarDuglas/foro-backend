import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TemaService } from './tema.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('temas')
export class TemaController {
  constructor(private temaService: TemaService) {}

  // Crear un tema con imagen (tipo avatar)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  crearTema(@UploadedFile() imagen: Express.Multer.File, @Body() data: any) {
    const foroId = Number(data.foroId);
    const usuarioId = Number(data.usuarioId);
    const titulo = data.titulo;
    const descripcion = data.descripcion || '';
    const imagenNombre = imagen?.filename; // ✅ Será undefined si no hay imagen

    return this.temaService.crearTema(foroId, usuarioId, titulo, descripcion, imagenNombre);
  }

  @Get('foro/:foroId')
  obtenerTemas(@Param('foroId') foroId: string) {
    return this.temaService.obtenerTemasPorForo(Number(foroId));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/posts')
  async obtenerPostsDelTema(@Param('id') id: string) {
    const posts = await this.temaService.obtenerPostsPorTema(Number(id));
    const tema = await this.temaService.obtenerTemaPorId(Number(id));
    return {
      posts,
      temaTitulo: tema?.titulo,
      temaCreadorId: tema?.usuarioId,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/eliminar')
  eliminarTema(@Param('id') id: string, @Req() req: any) {
    return this.temaService.eliminarTema(Number(id), req.user.id, req.user.rol);
  }
}
