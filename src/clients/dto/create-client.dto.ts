import { IsEnum, IsOptional, IsString, MaxLength, MinLength, Validate, ValidateIf } from 'class-validator';
import { ValidTypeClients } from '@/common/interfaces/clients/valid-type-clients.interface';
import { ValidTypePerson } from '@/common/interfaces/clients/valid-type-person.interface';
import { DniOrCeConstraint, FullNameLengthConstraint } from '@/common/validators/clients/create-client.validator';

export class CreateClientDto {
  @IsEnum(ValidTypePerson, {
    message: `El tipo de persona debe ser uno de los siguientes: ${Object.values(ValidTypePerson).join(', ')}`
  })
  typePerson: ValidTypePerson;

  @IsEnum(ValidTypeClients, {
    message: `El tipo de cliente debe ser uno de los siguientes: ${Object.values(ValidTypeClients).join(', ')}`
  })
  typeClient: ValidTypeClients;

  @IsString()
  @MinLength(9, { message: 'El teléfono debe tener exactamente 9 dígitos.' })
  @MaxLength(9, { message: 'El teléfono debe tener exactamente 9 dígitos.' })
  phone: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.natural || client.typePerson === ValidTypePerson.juridica)
  @IsString({
    message: 'El nombre completo es requerido para personas naturales y el nombre del representante es requerido para personas jurídicas.'
  })
  @Validate(FullNameLengthConstraint)
  fullName: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.natural)
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'El DNI debe tener exactamente 8 dígitos.' })
  @MaxLength(8, { message: 'El DNI debe tener exactamente 8 dígitos.' })
  dni?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'El CE debe tener mas de 8 caracteres.' })
  @MaxLength(20, { message: 'El CE debe tener menos de 20 caracteres.' })
  ce?: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.juridica)
  @IsString({
    message: 'La Razón Social es requerida para personas jurídicas.'
  })
  @MinLength(5, { message: 'La Razón Social debe tener mas de 5 caracteres.' })
  @MaxLength(150, { message: 'La Razón Social debe tener menos de 150 caracteres.' })
  socialReason?: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.juridica)
  @IsString({
    message: 'El RUC es requerido para personas jurídicas.'
  })
  @MinLength(11, { message: 'El RUC debe tener exactamente 11 dígitos.' })
  @MaxLength(11, { message: 'El RUC debe tener exactamente 11 dígitos.' })
  ruc?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'El email debe tener menos de 150 caracteres.' })
  email?: string;

  @Validate(DniOrCeConstraint)
  dniOrCe?: string;
}
