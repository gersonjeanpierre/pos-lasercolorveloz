
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttribute } from '@catalog/product-attributes/entities/product-attribute.entity';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { Product } from '@catalog/products/entities/product.entity';

@Injectable()
export class ProductAttributesService {
  constructor(
    @InjectRepository(ProductAttribute)
    private readonly attributeRepository: Repository<ProductAttribute>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createProductAttributeDto: CreateProductAttributeDto): Promise<ProductAttribute> {
    const { productId, ...attributeData } = createProductAttributeDto;
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${productId} no encontrado`);
    }

    const attribute = this.attributeRepository.create({ ...attributeData, product });
    return this.attributeRepository.save(attribute);
  }

  findAll(): Promise<ProductAttribute[]> {
    return this.attributeRepository.find();
  }

  async findOne(id: number): Promise<ProductAttribute> {
    const attribute = await this.attributeRepository.findOne({ where: { id } });
    if (!attribute) {
      throw new NotFoundException(`Atributo con ID ${id} no encontrado`);
    }
    return attribute;
  }

  async update(id: number, updateProductAttributeDto: UpdateProductAttributeDto): Promise<ProductAttribute> {
    const attribute = await this.attributeRepository.preload({
      id: id,
      ...updateProductAttributeDto,
    });

    if (!attribute) {
      throw new NotFoundException(`Atributo con ID ${id} no encontrado`);
    }
    return this.attributeRepository.save(attribute);
  }

  async remove(id: number): Promise<void> {
    const attribute = await this.findOne(id);
    if (!attribute) {
      throw new NotFoundException(`Atributo con ID ${id} no encontrado`);
    }
    await this.attributeRepository.remove(attribute);
  }
}