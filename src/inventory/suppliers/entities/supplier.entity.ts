
import { InventoryMovement } from '@/inventory/movements/entities/movement.entity';
import { Entity, Column, PrimaryColumn, Index, Generated, OneToMany } from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryColumn('uuid')
  id: string;

  @Index()
  @Column()
  @Generated('increment')
  internalId: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  socialReason: string;

  @Column({
    type: 'varchar',
    length: 11,
    unique: true
  })
  ruc: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 75
  })
  contactName: string;

  @Column({
    type: 'varchar',
    length: 9
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  email: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @OneToMany(
    () => InventoryMovement,
    (movement) => movement.supplier
  )
  movements: InventoryMovement[];
}