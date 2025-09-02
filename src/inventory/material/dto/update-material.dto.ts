import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDto } from './create-material.dto';
import { IsOptional } from 'class-validator';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {

  @IsOptional()
  name?: string;

  @IsOptional()
  unitOfMeasure?: string;

  @IsOptional()
  quantityMaterial?: number;

  @IsOptional()
  widthMaterial?: number;

  @IsOptional()
  heightMaterial?: number;

  @IsOptional()
  stock?: number;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  standId?: string;

}
