import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }, {
    message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol.'
  })
  password: string;

  @IsString()
  @MinLength(3)
  fullName: string;

}