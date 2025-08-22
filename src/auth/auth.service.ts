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

    const tokens = this.getJwtToken({ id: user.id });
    await this.usersService.update(user.id, { refreshToken: tokens.refreshToken })

    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      stand,
      ...tokens
    }
  }

  async refreshToken(refreshToken: string) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) {
      throw new UnauthorizedException('Token de actualización inválido o expirado');
    }

    try {
      this.jwtService.verify(refreshToken,
        { secret: process.env.JWT_REFRESH_TOKEN_SECRET }
      );
    } catch (error) {
      throw new UnauthorizedException('Token de actualización inválido');
    }

    const newTokens = this.getJwtToken({ id: user.id });
    await this.usersService.update(user.id, { refreshToken: newTokens.refreshToken })

    return newTokens;
  }

  private getJwtToken(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    })
    return {
      accessToken,
      refreshToken,
    };
  }

}
