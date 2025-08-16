import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStandDto } from './dto/create-stand.dto';
import { UpdateStandDto } from './dto/update-stand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stand } from './entities/stand.entity';
import { Repository } from 'typeorm';
import { Gallery } from '../gallery/entities/gallery.entity';
import { handleDBErrors } from '@common/db-errors/handle-db-errors';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class StandService {

  constructor(
    @InjectRepository(Stand)
    private readonly standRepository: Repository<Stand>,
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>
  ) { }

  async create(createStandDto: CreateStandDto): Promise<Stand> {

    try {
      const { galleryId, ...stadData } = createStandDto

      const gallery = await this.galleryRepository.findOne({
        where: { id: galleryId },
      })
      if (!gallery)
        throw new NotFoundException(`Galeria con ID ${galleryId} no encontrada`)
      const stand = this.standRepository.create({
        ...stadData,
        id: uuidv7(),
        gallery
      })
      return this.standRepository.save(stand);
    } catch (error) {
      handleDBErrors(error);
      throw error;
    }

  }

  findAll() {
    return this.standRepository.find();
  }

  async findOne(id: string): Promise<Stand> {
    const stand = await this.standRepository.findOne({
      where: { id }
    });
    if (!stand) {
      throw new NotFoundException(`Stand con ID ${id} no encontrado`);
    }
    return stand;
  }

  update(id: number, updateStandDto: UpdateStandDto) {
    return `This action updates a #${id} stand`;
  }

  remove(id: number) {
    return `This action removes a #${id} stand`;
  }
}
