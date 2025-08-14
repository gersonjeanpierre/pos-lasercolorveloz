import { Module } from "@nestjs/common";
import { MaterialModule } from "./material/material.module";
import { MaterialPriceHistoryModule } from "./material-price-history/material-price-history.module";
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [MaterialModule, MaterialPriceHistoryModule, SuppliersModule],
  exports: [InventoryModule]
})
export class InventoryModule { }