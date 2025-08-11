import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('clients')
export class Client {

  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    nullable: true
  })
  fullName: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: true
  })
  socialReason: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: true
  })
  dni?: string;

  @Column({
    type: 'text',
    nullable: true,
    unique: true
  })
  ruc?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  ce?: string; // cedula extranjeria

  @Column({
    type: 'text',
    unique: true
  })
  phone?: string;

  @Column({
    type: 'text',
    unique: true,
    nullable: true
  })
  email?: string;



}
