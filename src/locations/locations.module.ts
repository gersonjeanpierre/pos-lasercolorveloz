import { Module } from "@nestjs/common";
import { GalleryModule } from "./gallery/gallery.module";
import { StandModule } from "./stand/stand.module";

@Module({
  imports: [GalleryModule, StandModule],
  exports: [LocationsModule]
})

export class LocationsModule { }