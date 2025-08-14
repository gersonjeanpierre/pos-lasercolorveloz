
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSupplierDto {

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  socialReason: string;

  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}