// src/addons/addons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';
import { CreateProductAddonDto } from './dto/create-product-addon.dto';
import { UpdateProductAddonDto } from './dto/update-product-addon.dto';

@Injectable()
export class ProductAddonsService {
  constructor(
    @InjectRepository(ProductAddon)
    private readonly addonRepository: Repository<ProductAddon>,
  ) { }

  create(createAddonDto: CreateProductAddonDto): Promise<ProductAddon> {
    const addon = this.addonRepository.create(createAddonDto);
    return this.addonRepository.save(addon);
  }

  findAll(): Promise<ProductAddon[]> {
    return this.addonRepository.find();
  }

  async findOne(id: number): Promise<ProductAddon> {
    const addon = await this.addonRepository.findOne({ where: { id } });
    if (!addon) {
      throw new NotFoundException(`Agregado con ID ${id} no encontrado`);
    }
    return addon;
  }

  async update(id: number, updateAddonDto: UpdateProductAddonDto): Promise<ProductAddon> {
    const addon = await this.addonRepository.preload({
      id: id,
      ...updateAddonDto,
    });

    if (!addon) {
      throw new NotFoundException(`Agregado con ID ${id} no encontrado`);
    }
    return this.addonRepository.save(addon);
  }

  async remove(id: number): Promise<void> {
    const addon = await this.findOne(id);
    if (!addon) {
      throw new NotFoundException(`Agregado con ID ${id} no encontrado`);
    }
    await this.addonRepository.remove(addon);
  }
}