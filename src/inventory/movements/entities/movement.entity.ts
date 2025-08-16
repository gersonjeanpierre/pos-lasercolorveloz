// src/inventory/movements/entities/inventory-movement.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Material } from '../../material/entities/material.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';

export enum MovementType {
  ENTRY = 'entrada',
  EXIT = 'salida',
}

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  quantity: number;

  @Column({
    type: 'enum',
    enum: MovementType,
  })
  type: MovementType;

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
  @ManyToOne(() => Material, (material) => material.movements)
  material: Material;

  @ManyToOne(
    () => Supplier,
    (supplier) => supplier.movements,
    { nullable: true }
  )
  supplier?: Supplier;
}