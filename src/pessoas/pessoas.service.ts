import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const pessoData = {
        ...createPessoaDto,
        passwordHash: createPessoaDto.password,
      };
      const pessoa = this.pessoaRepository.create(pessoData);
      await this.pessoaRepository.save(pessoa);
      return pessoa;
    } catch (error) {
      console.log(error)
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
    }
  }

  async findAll() {
    return await this.pessoaRepository.find({ order: { id: 'desc' } });
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findBy({ id });
    if (!pessoa.length) {
      throw new NotFoundException();
    }
    return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const updatePeople = {
      nome: updatePessoaDto?.nome,
      passwordHash: updatePessoaDto?.password,
    };
    const dataUpdated = await this.pessoaRepository.preload({
      id,
      ...updatePeople,
    });
    if (!dataUpdated) {
      throw new NotFoundException();
    }
    this.pessoaRepository.save(dataUpdated);
    return dataUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
