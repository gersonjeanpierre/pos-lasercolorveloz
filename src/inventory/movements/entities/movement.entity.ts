// src/inventory/movements/entities/inventory-movement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Material } from '../../material/entities/material.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Stand } from '@/locations/stand/entities/stand.entity';

export enum MovementType {
  ENTRY = 'ENTRADA',
  EXIT = 'SALIDA',
}

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantity: number;

  @Column({
    type: 'varchar',
    length: 20,
    default: MovementType.ENTRY
  })
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  costPriceDollar: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  costPriceSoles: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  exchangeRateUsed: number;

  // Consumo de materiales Salida
  @Column()
  store: string



  // Relaciones
  @ManyToOne(
    () => Material,
    (material) => material.movements
  )
  material: Material;

  @ManyToOne(
    () => Supplier,
    (supplier) => supplier.movements,
    { nullable: true }
  )
  supplier?: Supplier;

  @ManyToOne(
    () => Stand,
    (stand) => stand.movements
  )
  stand: Stand;
}