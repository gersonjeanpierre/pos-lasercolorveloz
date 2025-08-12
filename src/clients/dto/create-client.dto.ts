import { IsEnum, IsOptional, IsString, MaxLength, MinLength, Validate, ValidateIf, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ValidTypeClients } from '../interfaces/valid-type-clients.interface';
import { ValidTypePerson } from '../interfaces/valid-type-person.interface';

@ValidatorConstraint({ name: 'dniOrCe', async: false })
export class DniOrCeConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const dto = args.object as CreateClientDto;
    if (dto.typePerson !== ValidTypePerson.natural) return true;
    const hasDni = !!dto.dni;
    const hasCe = !!dto.ce;
    return (hasDni !== hasCe);
  }

  defaultMessage(args: ValidationArguments) {
    const dto = args.object as CreateClientDto;
    if (dto.typePerson !== ValidTypePerson.natural) {
      return 'El DNI o CE es requerido para personas naturales.';
    }
    return 'Para personas naturales debe ingresar solo DNI o solo CE, no ambos y no ninguno.';
  }
}

export class CreateClientDto {
  @IsEnum(ValidTypePerson)
  typePerson: ValidTypePerson;

  @IsEnum(ValidTypeClients)
  typeClient: ValidTypeClients;

  @IsString({
    message: 'El teléfono es requerido y unico.'
  })
  phone: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.natural)
  @IsString({
    message: 'El nombre completo es requerido para personas naturales.'
  })
  fullName: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.natural)
  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'El DNI debe tener exactamente 8 caracteres.' })
  @MaxLength(8, { message: 'El DNI debe tener exactamente 8 caracteres.' })
  dni?: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.juridica)
  @IsString({
    message: 'La Razón Social es requerida para personas jurídicas.'
  })
  socialReason?: string;

  @ValidateIf(client => client.typePerson === ValidTypePerson.juridica)
  @IsString({
    message: 'El RUC es requerido para personas jurídicas.'
  })
  ruc?: string;

  @IsOptional()
  @IsString()
  ce?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @Validate(DniOrCeConstraint)
  dniOrCe?: string;
}