import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gallery } from './entities/gallery.entity';
import { StandModule } from '../stand/stand.module';
import { Stand } from '../stand/entities/stand.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gallery, Stand]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule { }
