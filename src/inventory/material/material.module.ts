import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Stand } from '@/locations/stand/entities/stand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material, Stand])
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule { }
