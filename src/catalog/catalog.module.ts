
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ProductAttributesModule } from './product-attributes/product-attributes.module';
import { ProductAddonsModule } from './product-addons/product-addons.module';

@Module({
  imports: [ProductsModule, ProductAddonsModule, ProductAttributesModule],
  exports: [CatalogModule]
})

export class CatalogModule { }