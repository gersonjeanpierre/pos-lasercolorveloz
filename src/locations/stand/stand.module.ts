import { Module } from '@nestjs/common';
import { StandService } from './stand.service';
import { StandController } from './stand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stand } from './entities/stand.entity';
import { Gallery } from '../gallery/entities/gallery.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stand, Gallery]),
  ],
  controllers: [StandController],
  providers: [StandService],
})
export class StandModule { }
