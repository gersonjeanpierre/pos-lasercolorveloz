import { ConflictException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) { }

  async create(createClientDto: CreateClientDto) {

    try {
      const client = this.clientRepository.create({
        ...createClientDto,
        id: uuidv7(),
      });

      return await this.clientRepository.save(client);
    }
    catch (error) {
      if (error.code === '23505') { // 23505 es el código de error de Postgres para unique violation
        if (error.detail.includes('dni'))
          throw new ConflictException('El DNI ya está registrado.');
        if (error.detail.includes('phone'))
          throw new ConflictException('El teléfono ya está registrado.');
        if (error.detail.includes('ce'))
          throw new ConflictException('El CE ya está registrado.');
        if (error.detail.includes('socialReason'))
          throw new ConflictException('La Razón Social ya está registrada.');
        if (error.detail.includes('ruc'))
          throw new ConflictException('El RUC ya está registrado.');
      }
      throw error;
    }
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new Error(`Cliente no encontrado`);
    return client;
  }

  async update(id: string, updateClientDto: Partial<CreateClientDto>): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new Error(`Cliente no encontrado`);

    this.clientRepository.merge(client, updateClientDto);
    return await this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) throw new Error(`Cliente no encontrado`);

    client.isActive = false;
    await this.clientRepository.save(client);
  }

}
