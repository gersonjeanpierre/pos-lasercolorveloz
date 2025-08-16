import { IsNumber, IsString } from "class-validator";

export class CreateProductAddonDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  baseCost: number;
}