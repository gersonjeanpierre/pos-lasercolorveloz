import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ValidTypePerson } from "@/common/enums/clients/valid-type-person.enum";
import { CreateClientDto } from "@/clients/dto/create-client.dto";

@ValidatorConstraint({ name: 'fullNameLength', async: false })
export class FullNameLengthConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (typeof value !== 'string') return false;
    return value.length >= 3 && value.length <= 75;
  }
  defaultMessage(args: ValidationArguments) {
    const value = args.value || '';
    const typePerson = (args.object as any).typePerson;
    if (typePerson === ValidTypePerson.juridica) {
      return `El nombre del representante es requerido para persona juridica y debe tener entre 3 y 75 caracteres. Ingresó: ${value.length}`;
    }
    return `El nombre completo es requerido para personas naturales y debe tener entre 3 y 75 caracteres. Ingresó: ${value.length}`;
  }
}

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