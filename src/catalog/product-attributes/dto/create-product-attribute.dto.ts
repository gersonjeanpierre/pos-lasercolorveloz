
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductAttributeDto {

  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  name: string; // Ejemplo: 'Tipo de Material'

  @IsString()
  value: string; // Ejemplo: 'Lona Brillosa'

  @IsString()
  productId: string;
}