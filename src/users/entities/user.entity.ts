import { Order } from "@/orders/entities/order.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'text',
    unique: true
  })
  email: string;

  @Column({
    type: 'text',
    select: false,
  })
  password: string;

  @Column({
    type: 'text'
  })
  fullName: string;

  @Column({
    type: 'text'
  })
  responsibility: string;

  @Column({
    type: 'boolean',
    default: true
  })
  isActive: boolean;

  @Column({
    type: 'text',
    array: true,
    default: ['employee']
  })
  roles: string[];

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