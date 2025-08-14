import { Injectable } from '@nestjs/common';
import { CreateMaterialPriceHistoryDto } from './dto/create-material-price-history.dto';
import { UpdateMaterialPriceHistoryDto } from './dto/update-material-price-history.dto';

@Injectable()
export class MaterialPriceHistoryService {
  create(createMaterialPriceHistoryDto: CreateMaterialPriceHistoryDto) {
    return 'This action adds a new materialPriceHistory';
  }

  findAll() {
    return `This action returns all materialPriceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialPriceHistory`;
  }

  update(id: number, updateMaterialPriceHistoryDto: UpdateMaterialPriceHistoryDto) {
    return `This action updates a #${id} materialPriceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialPriceHistory`;
  }
}
