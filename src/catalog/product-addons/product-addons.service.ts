// src/addons/addons.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';
import { CreateProductAddonDto } from './dto/create-product-addon.dto';
import { UpdateProductAddonDto } from './dto/update-product-addon.dto';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class ProductAddonsService {
  constructor(
    @InjectRepository(ProductAddon)
    private readonly addonRepository: Repository<ProductAddon>,
  ) { }

  create(createAddonDto: CreateProductAddonDto): Promise<ProductAddon> {
    try {
      const addon = this.addonRepository.create({
        ...createAddonDto,
        id: uuidv7()
      });
      return this.addonRepository.save(addon);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el agregado');
    }
  }

  findAll(): Promise<ProductAddon[]> {
    return this.addonRepository.find();
  }

  async findOne(id: string): Promise<ProductAddon> {
    const addon = await this.addonRepository.findOne({ where: { id } });
    if (!addon) {
      throw new NotFoundException(`Agregado con ID ${id} no encontrado`);
    }
    return addon;
  }

  async update(id: string, updateAddonDto: UpdateProductAddonDto): Promise<ProductAddon> {
    const addon = await this.addonRepository.findOne({ where: { id } });
    if (!addon) throw new NotFoundException('Agregado no encontrado');
    this.addonRepository.merge(addon, updateAddonDto);
    return this.addonRepository.save(addon);
  }

  async remove(id: string): Promise<void> {
    const addon = await this.addonRepository.findOne({ where: { id } });
    if (!addon) throw new NotFoundException('Agregado no encontrado');
    addon.isActive = false;
    await this.addonRepository.save(addon);
  }
}