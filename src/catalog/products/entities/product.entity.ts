
import { Entity, Column, OneToMany, ManyToMany, PrimaryColumn, JoinTable } from 'typeorm';
import { ProductAttribute } from '@/catalog/product-attributes/entities/product-attribute.entity';
import { ProductAddon } from '@catalog/product-addons/entities/product-addon.entity';
import { ProductType } from '@/common/enums/catalog/products/product-type.enum';

@Entity()
export class Product {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProductType.Impresion
  })
  type: string;

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
    type: 'boolean',
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
  @JoinTable()
  addons: ProductAddon[];
}
