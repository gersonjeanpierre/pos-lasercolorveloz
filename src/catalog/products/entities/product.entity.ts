
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { ProductAttribute } from '@/catalog/product-attributes/entities/product-attribute.entity';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';
import { ProductType } from '@/common/interfaces/catalog/products/product-type.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.Impresion
  })
  type: ProductType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2
  })
  baseCost: number;

  @Column({
    default: true
  })
  isActive: boolean;

  @OneToMany(
    () => ProductAttribute,
    (attribute) => attribute.product, { cascade: true }
  )
  attributes: ProductAttribute[];

  @ManyToMany(
    () => ProductAddon,
    (addon) => addon.products
  )
  addons: ProductAddon[];
}
