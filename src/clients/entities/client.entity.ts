import { Column, Entity, PrimaryColumn } from "typeorm";
import { ValidTypeClients } from "@/common/enums/clients/valid-type-clients.enum";
import { ValidTypePerson } from "@/common/enums/clients/valid-type-person.enum";

@Entity('clients')
export class Client {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    enum: ValidTypePerson,
    default: ValidTypePerson.natural,
    length: 16
  })
  typePerson: string;

  @Column({
    type: 'varchar',
    enum: ValidTypeClients,
    default: ValidTypeClients.finalNuevo,
    length: 28
  })
  typeClient: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 9
  })
  phone?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 75
  })
  fullName?: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    length: 150
  })
  socialReason?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    length: 8
  })
  dni?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    length: 11
  })
  ruc?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    unique: true,
    length: 20
  })
  ce?: string; // cedula extranjeria

  @Column({
    type: 'varchar',
    unique: true,
    nullable: true,
    length: 100
  })
  email?: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;
}
