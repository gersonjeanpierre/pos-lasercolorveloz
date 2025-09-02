import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMaterialDto {

  @IsOptional()
  @IsString()
  id?: string

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  unitOfMeasure: string;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsNumber()
  @IsOptional()
  quantityMaterial?: number;

  @IsNumber()
  @IsOptional()
  widthMaterial?: number;

  @IsNumber()
  @IsOptional()
  heightMaterial?: number;

  @IsNotEmpty()
  @IsString()
  standId: string;
}
