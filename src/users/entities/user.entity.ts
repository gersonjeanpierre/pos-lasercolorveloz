import { Entity, Column, PrimaryColumn } from 'typeorm';
import { Role } from '../utils/roles.enum';
import { v7 as uuidv7 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Guardaremos un hash de la contraseña, nunca la contraseña en texto plano

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.Employee,
  }) // Puedes definir roles por defecto
  role: Role;
}