import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto'
import { GetUser } from './decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ValidRoles } from '@common/interfaces/auth/valid-roles.interface';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @Auth(ValidRoles.admin)
  getPrivateData(
    @GetUser() user: User
  ) {
    return { message: 'This is private data', user };
  }

  @Get('validate')
  @Auth() // Asume que el guard de JWT está configurado
  validateToken(@GetUser() user: User) {
    return { valid: true, message: 'Token válido', user };
  }
}