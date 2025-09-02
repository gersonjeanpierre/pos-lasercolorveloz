
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, Index, Generated, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Gallery } from '../../gallery/entities/gallery.entity';
import { Material } from '@/inventory/material/entities/material.entity';
import { InventoryMovement } from '@/inventory/movements/entities/movement.entity';

@Entity()
export class Stand {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column()
  @Generated('increment')
  internalId: number;

  @Column({
    type: 'varchar',
    length: 150,
  })
  socialReason: string;

  @Column({
    type: 'varchar',
    length: 11,
  })
  ruc: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 150
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true
  })
  phoneExtra?: string;

  @Column({
    type: 'varchar',
    length: 9
  })
  yape: string;

  @Column({
    type: 'varchar',
    length: 16
  })
  bcpCta: string;

  @Column({
    type: 'varchar',
    length: 20
  })
  bcpCci: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  email: string

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @ManyToOne(
    () => Gallery,
    (gallery) => gallery.stands
  )
  gallery: Gallery;

  @OneToMany(
    () => Material,
    (material) => material.stand
  )
  materials: Material[];

  @OneToMany(
    () => InventoryMovement,
    (movement) => movement.stand
  )
  movements: InventoryMovement[];

}