import { IsString, MaxLength } from "class-validator";

export class CreateGalleryDto {
  @IsString()
  @MaxLength(150, {
    message: 'El nombre no puede exceder los 150 caracteres'
  })
  name: string;

  @IsString()
  @MaxLength(200, {
    message: 'La dirección no puede exceder los 200 caracteres'
  })
  address: string;
}