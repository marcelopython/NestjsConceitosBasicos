import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lasId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados.find((item) => item.id == parseInt(id));
    if (recado) {
      return recado;
    }
    throw new HttpException('Nost found', HttpStatus.NOT_FOUND);
  }

  create(body: CreateRecadoDto) {
    this.lasId++;
    const id = this.lasId;
    const newRecado = {
      id,
      ...body,
      lido: false,
      data: new Date(),
    };
    this.recados.push(newRecado);
  }

  update(body: UpdateRecadoDto, id: number) {
    console.log(id)
    const recadoIndex = this.recados.findIndex((item) => item.id === id);

    if (recadoIndex < 0) {
      throw new HttpException('Nost found', HttpStatus.NOT_FOUND);
    }
    const actualBody = this.recados[recadoIndex];
    this.recados[recadoIndex] = {
      ...actualBody,
      ...body,
    };
    return this.recados;
  }

  remove(id: number) {
    const index = this.recados.findIndex((item) => item.id === id);
    if (index < 0) {
      throw new HttpException('Nost found', HttpStatus.NOT_FOUND);
    }
    return this.recados.slice(index, 1);
  }
}
