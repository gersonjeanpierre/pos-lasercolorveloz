// src/sales/ventas/entities/venta-item.entity.ts
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../../catalog/products/entities/product.entity';
import { Sale } from './sale.entity';

@Entity()
export class SaleItem {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  manualUnitPrice?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  calculatedUnitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;

  @ManyToOne(() => Product)
  producto: Product;
}