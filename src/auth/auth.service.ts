import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { handleDBErrors } from '@common/db-errors/handle-db-errors';
import { StandService } from '@/locations/stand/stand.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly standService: StandService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      const { password, ...result } = user;
      return {
        ...result,
        token: this.getJwtToken({ id: user.id }),
      }

    } catch (error) {
      handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {

    const { email, password, standId } = loginUserDto;
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas (email)');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas (password)');
    }

    const stand = await this.standService.findOne(standId);
    if (!stand) {
      throw new NotFoundException(`Stand seleccionado no encontrado.`);
    }
    const { password: _, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      stand,
      token: this.getJwtToken({ id: user.id }),
    }
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

}
