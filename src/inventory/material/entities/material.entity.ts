
import { InventoryMovement } from '@/inventory/movements/entities/movement.entity';
import { Stand } from '@/locations/stand/entities/stand.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Material {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  unitOfMeasure: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true
  })
  quantityMaterial?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true
  })
  widthMaterial?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 3,
    nullable: true
  })
  heightMaterial?: number;

  @Column({
    type: 'int',
  })
  stock: number;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @OneToMany(
    () => InventoryMovement,
    (movement) => movement.material
  )
  movements: InventoryMovement[];

  @ManyToOne(
    () => Stand,
    (stand) => stand.materials
  )
  stand: Stand;

}