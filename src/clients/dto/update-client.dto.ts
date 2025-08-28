import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional } from 'class-validator';
import { ValidTypePerson } from '@/common/enums/clients/valid-type-person.enum';
import { ValidTypeClients } from '@/common/enums/clients/valid-type-clients.enum';

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