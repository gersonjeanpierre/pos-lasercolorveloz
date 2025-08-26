import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional } from 'class-validator';
import { ValidTypePerson } from '@/common/interfaces/clients/valid-type-person.interface';
import { ValidTypeClients } from '@/common/interfaces/clients/valid-type-clients.interface';

export class UpdateClientDto extends PartialType(CreateClientDto) {

  @IsOptional()
  typePerson?: ValidTypePerson;

  @IsOptional()
  typeClient?: ValidTypeClients;

  @IsOptional()
  phone?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  fullName?: string;

  @IsOptional()
  responsibility?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  roles?: string[];

}