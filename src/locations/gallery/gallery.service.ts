import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { handleDBErrors } from '@common/db-errors/handle-db-errors';

@Injectable()
export class GalleryService {

  constructor(
    @InjectRepository(Gallery)
    private readonly galleryRepository: Repository<Gallery>
  ) { }

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {

    try {
      const gallery = this.galleryRepository.create({
        ...createGalleryDto,
        id: uuidv7()
      });
      return await this.galleryRepository.save(gallery);

    } catch (error) {
      handleDBErrors(error);
      throw error;
    }


  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryRepository.find({
      relations: ['stands'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`;
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }


}
