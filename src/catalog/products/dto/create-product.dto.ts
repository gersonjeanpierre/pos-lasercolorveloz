// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ProductType } from '@/common/interfaces/catalog/products/product-type.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  type: ProductType;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  addonIds?: number[];
}