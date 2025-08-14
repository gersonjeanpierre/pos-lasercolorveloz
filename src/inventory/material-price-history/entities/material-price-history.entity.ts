// src/inventory/material-price-history/entities/material-price-history.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Material } from '../../material/entities/material.entity';

@Entity()
export class MaterialPriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  previousPriceDollar: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  newPriceDollar: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  previousPriceSoles: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  newPriceSoles: number;

  @CreateDateColumn()
  changeDate: Date;

  @ManyToOne(
    () => Material,
    material => material.priceHistory,
    { onDelete: 'CASCADE' }
  )
  material: Material;
}