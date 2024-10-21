import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
    });
    if (recado) {
      return recado;
    }
    throw new HttpException('Nost found', HttpStatus.NOT_FOUND);
  }

  async create(body: CreateRecadoDto) {
    const { deId, paraId } = body;

    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);
    // console.log(de, para);
    const newRecado = {
      texto: body.texto,
      de: de[0],
      para: para[0],
      lido: false,
      data: new Date(),
    };

    console.log('novo recado ==> ', newRecado);

    const recado = await this.recadoRepository.create(newRecado);
    return this.recadoRepository.save(recado);
  }

  async update(body: UpdateRecadoDto, id: number) {
    const partialUpdateRecadoDTO = {
      lido: body?.lido,
      texto: body?.texto,
    };

    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDTO,
    });
    if (!recado) {
      throw new HttpException('Nost found', HttpStatus.NOT_FOUND);
    }
    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return this.recadoRepository.remove(recado);
  }
}
