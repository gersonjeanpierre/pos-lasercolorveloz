import { IsDecimal, IsNumber } from "class-validator";

export class CreateOrderDto {

  @IsNumber()
  advancePayment: number;

  @IsNumber()
  finalPayment: number;


}
