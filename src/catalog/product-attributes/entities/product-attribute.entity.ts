
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductAttribute {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  value: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @ManyToOne(
    () => Product,
    (product) => product.attributes
  )
  product: Product;
}