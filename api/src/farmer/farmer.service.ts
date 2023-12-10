import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateFarmerDto } from './dto/create-farmer.dto';
import { FarmerRepository } from './farmer.repository';
import { UpdateFarmerDto } from './dto/update-farmer.dto';

@Injectable()
export class FarmerService {
  constructor(private repository: FarmerRepository) { }

  create(createFarmerDto: CreateFarmerDto) {
    return this.repository.create(createFarmerDto)
  }

  async findAll(page?: number) {
    const farmers = await this.repository.findAll(page);

    if (!farmers.data.length) {
      throw new NotFoundException('Não existem agricultores nesta página.')
    }

    return farmers
  }

  async findOne(id: number) {
    const farmer = await this.repository.findOne(id);

    if (farmer === null) {
      throw new NotFoundException('Agricultor não encontrado.')
    }

    return farmer
  }

  update(id: number, updateFarmerDto: UpdateFarmerDto) {
    return this.repository.update(id, updateFarmerDto)
  }

  remove(id: number) {
    return this.repository.remove(id)
  }
}
