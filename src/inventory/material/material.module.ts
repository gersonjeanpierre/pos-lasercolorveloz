import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialPriceHistoryModule } from '../material-price-history/material-price-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
    MaterialPriceHistoryModule
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule { }
