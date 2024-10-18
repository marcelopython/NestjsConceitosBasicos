import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get()
  findAll() {
    return this.recadosService.findAll();
  }

  //@Get('fixo/:dinamico/:id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  }

  // Pode ser adicionado o codigo de retorno, por padrão o post vai retornar o 201
  //@HttpCode(201)
  //@HttpCode(HttpStatus.OK)
  @Post()
  create(@Body() body: any) {
    console.log(body);
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.recadosService.update(body, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
