import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateStandDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150, {
    message: 'La razón social no puede exceder los 150 caracteres'
  })
  socialReason: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(11, {
    message: 'El RUC no puede exceder los 11 dígitos'
  })
  ruc: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El nombre no puede exceder los 100 caracteres'
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150, {
    message: 'La dirección no puede exceder los 150 caracteres'
  })
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(9, {
    message: 'El teléfono no puede exceder los 9 dígitos'
  })
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, {
    message: 'El teléfono adicional no puede exceder los 20 caracteres'
  })
  phoneExtra?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(9, {
    message: 'El numero de Yape no puede exceder los 9 dígitos'
  })
  yape: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16, {
    message: 'El número de cuenta BCP no puede exceder los 16 dígitos'
  })
  bcpCta: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20, {
    message: 'El número de cuenta interbancaria del BCP no puede exceder los 20 dígitos'
  })
  bcpCci: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El email no puede exceder los 100 caracteres'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  galleryId: string;
}
