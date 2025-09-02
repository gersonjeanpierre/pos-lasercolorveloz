import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAddonDto } from './create-product-addon.dto';
import { IsOptional } from 'class-validator';

export class UpdateProductAddonDto extends PartialType(CreateProductAddonDto) {

  @IsOptional()
  name?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  isActive?: boolean;
}
