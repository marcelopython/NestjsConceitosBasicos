import { Controller, Get, Param } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    @Get()
    findAll() {
        return 'retornar todos os recados'
    }

    //@Get('fixo/:dinamico/:id')
    @Get(':id')
    findOne(@Param('id') parametros: string) {
        console.log(parametros)
        return 'retorna um recado'
    }

}
