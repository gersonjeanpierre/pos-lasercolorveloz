import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  addonIds?: number[];
}