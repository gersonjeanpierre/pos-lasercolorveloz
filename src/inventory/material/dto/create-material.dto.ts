import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMaterialDto {

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
  quantityMaterial?: number;

  @IsNumber()
  widthMaterial?: number;

  @IsNumber()
  heightMaterial?: number;

}
