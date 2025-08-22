import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';
import { IsOptional } from 'class-validator';

export class UpdateClientDto extends PartialType(CreateClientDto) {

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

  @IsOptional()
  refreshToken?: string;

}