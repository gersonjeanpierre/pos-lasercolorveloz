// src/products/entities/addon.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductAddon {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string; // Por ejemplo: 'Ojales', 'Bastidor'

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @ManyToMany(
    () => Product,
    (product) => product.addons
  )
  products: Product[];
}