import { Module } from '@nestjs/common';
import { MaterialPriceHistoryService } from './material-price-history.service';
import { MaterialPriceHistoryController } from './material-price-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialPriceHistory } from './entities/material-price-history.entity';
import { Material } from '../material/entities/material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaterialPriceHistory, Material])
  ],
  controllers: [MaterialPriceHistoryController],
  providers: [MaterialPriceHistoryService],
  exports: [MaterialPriceHistoryService]
})
export class MaterialPriceHistoryModule { }
