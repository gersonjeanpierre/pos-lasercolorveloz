
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}