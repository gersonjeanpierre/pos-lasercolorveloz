import { User } from "@/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('orders')
export class Order {

  @PrimaryColumn('uuid')
  id: string;

  @Column('float')
  advancePayment: number;

  @Column('float')
  finalPayment: number;

  @ManyToOne(
    () => User,
    (user) => user.order
  )
  user: User;

}
