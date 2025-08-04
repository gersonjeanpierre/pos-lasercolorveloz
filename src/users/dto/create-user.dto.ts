// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email no es válido.' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres.' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;




}