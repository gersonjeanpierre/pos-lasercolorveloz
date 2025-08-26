import { IsEmail, IsOptional, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsEmail({}, {
    message: 'Email debe ser un correo electrónico válido.'
  })
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }, {
    message: 'Contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un símbolo.'
  })
  password: string;

  @IsString()
  @MinLength(3, {
    message: 'Debe ingresar un nombre completo con al menos 3 caracteres.'
  })
  fullName: string;

  @IsString()
  @MinLength(5, {
    message: 'Debe ingresar una responsabilidad con al menos 5 caracteres.'
  })
  responsibility: string;

  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Debe ingresar un rol con al menos 5 caracteres.'
  })
  roles?: string[];

}