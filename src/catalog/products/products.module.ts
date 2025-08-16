import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from '@/auth/auth.module';
import { ProductAddon } from '../product-addons/entities/product-addon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductAddon]),
    AuthModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
