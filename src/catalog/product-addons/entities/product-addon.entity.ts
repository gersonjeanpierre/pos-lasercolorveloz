// src/products/entities/addon.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductAddon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Por ejemplo: 'Ojales', 'Bastidor'

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number; // Costo extra por el agregado

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  baseCost: number;

  @ManyToMany(
    () => Product,
    (product) => product.addons
  )
  @JoinTable()
  products: Product[];
}