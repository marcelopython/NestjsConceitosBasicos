import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {

    
    @Get()
    findAll() {
        return 'retornar todos os recados'
    }

    //@Get('fixo/:dinamico/:id')
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id)
        return `retorna um recado ID ${id}`
    }

    // Pode ser adicionado o codigo de retorno, por padrão o post vai retornar o 201
    //@HttpCode(201)
    //@HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() body: any) {
        console.log(body)
        return `Essa rota cria um recado`
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {

        console.log(id, body)
        return 'atualiza o recado'

    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `deleta um recado ID ${id}`
    }

}
