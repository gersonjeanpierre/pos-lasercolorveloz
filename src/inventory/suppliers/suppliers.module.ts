import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { InventoryMovement } from '../movements/entities/movement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, InventoryMovement])
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule { }
