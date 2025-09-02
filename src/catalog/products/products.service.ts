// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAddon)
    private readonly addonRepository: Repository<ProductAddon>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {

    try {
      const { addonIds, ...productData } = createProductDto;
      const product = this.productRepository.create({
        ...productData,
        id: uuidv7()
      });

      if (addonIds && addonIds.length > 0) {
        const addons = await this.addonRepository.findBy({ id: In(addonIds) });
        product.addons = addons;
      }

      return this.productRepository.save(product);

    } catch (error) {
      throw new NotFoundException('Error al crear el producto');
    }

  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['addons', 'attributes'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id, isActive: true }, relations: ['addons', 'attributes'] });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const { addonIds, ...productData } = updateProductDto;
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    Object.assign(product, productData);

    if (addonIds) {
      const addons = await this.addonRepository.findBy({ id: In(addonIds) });
      product.addons = addons;
    }

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    product.isActive = false; // Eliminación suave
    await this.productRepository.save(product);
  }
}