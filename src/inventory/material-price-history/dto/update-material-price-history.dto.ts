import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialPriceHistoryDto } from './create-material-price-history.dto';

export class UpdateMaterialPriceHistoryDto extends PartialType(CreateMaterialPriceHistoryDto) {}
