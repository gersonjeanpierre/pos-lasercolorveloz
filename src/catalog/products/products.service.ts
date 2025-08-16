// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductAddon)
    private readonly addonRepository: Repository<ProductAddon>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { addonIds, ...productData } = createProductDto;
    const product = this.productRepository.create(productData);

    if (addonIds && addonIds.length > 0) {
      const addons = await this.addonRepository.findByIds(addonIds);
      product.addons = addons;
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['addons', 'attributes'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id, isActive: true }, relations: ['addons', 'attributes'] });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { addonIds, ...productData } = updateProductDto;
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    Object.assign(product, productData);

    if (addonIds) {
      const addons = await this.addonRepository.findByIds(addonIds);
      product.addons = addons;
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    product.isActive = false; // Eliminación suave
    await this.productRepository.save(product);
  }
}