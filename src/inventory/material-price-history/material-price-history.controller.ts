import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaterialPriceHistoryService } from './material-price-history.service';
import { CreateMaterialPriceHistoryDto } from './dto/create-material-price-history.dto';
import { UpdateMaterialPriceHistoryDto } from './dto/update-material-price-history.dto';

@Controller('material-price-history')
export class MaterialPriceHistoryController {
  constructor(private readonly materialPriceHistoryService: MaterialPriceHistoryService) {}

  @Post()
  create(@Body() createMaterialPriceHistoryDto: CreateMaterialPriceHistoryDto) {
    return this.materialPriceHistoryService.create(createMaterialPriceHistoryDto);
  }

  @Get()
  findAll() {
    return this.materialPriceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialPriceHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMaterialPriceHistoryDto: UpdateMaterialPriceHistoryDto) {
    return this.materialPriceHistoryService.update(+id, updateMaterialPriceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialPriceHistoryService.remove(+id);
  }
}
