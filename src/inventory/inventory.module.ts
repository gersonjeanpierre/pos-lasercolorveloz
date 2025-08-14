import { Module } from "@nestjs/common";
import { MaterialModule } from "./material/material.module";
import { SuppliersModule } from './suppliers/suppliers.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [MaterialModule, SuppliersModule, MovementsModule],
  exports: [InventoryModule]
})
export class InventoryModule { }