import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v7 as uuidv7 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const { password, ...rest } = createUserDto;
    const user = this.userRepository.create({
      ...rest,
      id: uuidv7(),
      password: bcrypt.hashSync(password, 10)
    })

    return await this.userRepository.save(user);
  }


  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        fullName: true,
        responsibility: true,
        isActive: true,
        roles: true,
      }
    })
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
