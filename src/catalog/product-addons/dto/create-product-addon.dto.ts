import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductAddonDto {

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}