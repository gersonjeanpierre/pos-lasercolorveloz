import { Module } from '@nestjs/common';
import { ProductAddonsService } from './product-addons.service';
import { ProductAddonsController } from './product-addons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAddon } from './entities/product-addon.entity';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductAddon]),
    AuthModule
  ],
  controllers: [ProductAddonsController],
  providers: [ProductAddonsService],
})
export class ProductAddonsModule { }
