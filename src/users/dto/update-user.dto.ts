import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  responsibility?: string;

  @IsOptional()
  @IsString()
  @MinLength(5, {
    message: 'Debe ingresar un rol con al menos 5 caracteres.'
  })
  roles?: string[];

  @IsOptional()
  @IsString()
  refreshToken?: string;

}
