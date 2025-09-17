// src/sales/ventas/entities/venta.entity.ts
import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Stand } from '../../../locations/stand/entities/stand.entity';
import { SaleItem } from './sale-item';

export enum SalesStatus {
  PENDING = 'PENDIENTE',
  COMPLETED = 'COMPLETADO',
  PARTIALLYPAID = 'ADELANTO',
  PAGADO = 'PAGADO',
  INPROCESS = 'EN PROCESO',
  READYFORPICKUP = 'LISTO PARA RECOGER',
  DELIVERED = 'ENTREGADO',
  FAILED = 'FALLIDO',
}

@Entity()
export class Sale {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ unique: true })
  correlative: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  remainder: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  igv: number;

  @Column({ type: 'boolean', default: false })
  isIgv: boolean;

  @Column({
    type: 'varchar',
    enum: SalesStatus,
    array: true,
    default: [SalesStatus.PENDING]
  })
  status: SalesStatus[];

  @Column({ type: 'varchar', array: true, default: [SalesStatus.PENDING] })
  statusProduct: SalesStatus[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createSale: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updateSale: Date;

  // Relaciones
  @ManyToOne(() => User)
  seller: User;

  @ManyToOne(() => Stand)
  stand: Stand;

  @OneToMany(() => SaleItem, (item) => item.sale)
  items: SaleItem[];
}