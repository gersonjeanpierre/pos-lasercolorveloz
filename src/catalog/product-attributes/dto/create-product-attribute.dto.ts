
import { IsString, IsNumber } from 'class-validator';

export class CreateProductAttributeDto {
  @IsString()
  name: string; // Ejemplo: 'Tipo de Material'

  @IsString()
  value: string; // Ejemplo: 'Lona Brillosa'

  @IsNumber()
  productId: number;
}