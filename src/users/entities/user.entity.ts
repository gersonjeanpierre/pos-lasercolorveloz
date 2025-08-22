import { Order } from "@/orders/entities/order.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 100
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 75,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 50
  })
  responsibility: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @Column({
    type: 'varchar',
    array: true,
    length: 20,
    default: ['employee']
  })
  roles: string[];

  @Column({
    type: 'text',
    nullable: true,
    unique: true
  })
  refreshToken: string;

  @OneToMany(
    () => Order,
    (order) => order.user
  )
  order: Order;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}