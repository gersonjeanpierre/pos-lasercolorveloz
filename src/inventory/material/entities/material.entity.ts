
import { InventoryMovement } from '@/inventory/movements/entities/movement.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Material {
  @PrimaryGeneratedColumn()
  id: number;

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

}