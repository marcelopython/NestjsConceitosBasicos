import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    @Get()
    findAll() {
        return 'retornar todos os recados'
    }

    //@Get('fixo/:dinamico/:id')
    @Get(':id')
    findOne() {
        return 'retorna um recado'
    }

}
