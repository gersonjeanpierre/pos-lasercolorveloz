
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Stand } from '../../stand/entities/stand.entity'; // Aún no existe, pero lo crearemos

@Entity()
export class Gallery {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 200
  })
  address: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @OneToMany(
    () => Stand,
    (stand) => stand.gallery
  )
  stands: Stand[];
}