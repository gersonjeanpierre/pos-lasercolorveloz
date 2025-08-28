// src/addons/addons.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductAddonsService } from './product-addons.service';
import { ProductAddon } from './entities/product-addon.entity';
import { CreateProductAddonDto } from './dto/create-product-addon.dto';
import { UpdateProductAddonDto } from './dto/update-product-addon.dto';
import { Auth } from '@/auth/decorators';
import { ValidRoles } from '@/common/enums/auth/valid-roles.enum';

@Controller('product-addons')
export class ProductAddonsController {
  constructor(private readonly productAddonService: ProductAddonsService) { }

  @Post()
  create(@Body() createProductAddonDto: CreateProductAddonDto): Promise<ProductAddon> {
    return this.productAddonService.create(createProductAddonDto);
  }

  @Get()
  @Auth(ValidRoles.admin, ValidRoles.employee)
  findAll(): Promise<ProductAddon[]> {
    return this.productAddonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductAddon> {
    return this.productAddonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductAddonDto: UpdateProductAddonDto): Promise<ProductAddon> {
    return this.productAddonService.update(+id, updateProductAddonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAddonService.remove(+id);
  }
}