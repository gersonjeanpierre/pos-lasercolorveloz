import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Stand } from '@/locations/stand/entities/stand.entity';

@Injectable()
export class MaterialService {

  constructor(
    @InjectRepository(Material)
    private readonly materialRepository: Repository<Material>,
    @InjectRepository(Stand)
    private readonly standRepository: Repository<Stand>
  ) { }

  async create(createMaterialDto: CreateMaterialDto) {
    try {
      const { standId, ...materialData } = createMaterialDto;

      const stand = await this.standRepository.findOne({ where: { id: standId } });
      if (!stand) throw new Error('Stand no encontrado');

      const material = this.materialRepository.create({
        ...materialData,
        id: uuidv7(),
        stand
      });
      return await this.materialRepository.save(material);
    } catch (error) {
      throw new Error('Error creating material');
    }
  }

  async findAll(): Promise<Material[]> {
    const materials = await this.materialRepository.find({
      relations: ['stand']
    });
    return materials.map(material => ({
      ...material,
      standId: material.stand.id,
      standName: material.stand.name
    }))
  }

  async findOne(id: string): Promise<Material> {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) throw new Error('Material no encontrado');
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<any> {
    const material = await this.materialRepository.findOne({
      where: { id },
      relations: ['stand']
    });
    if (!material) throw new Error('Material no encontrado');

    // Si se envía standId, actualiza la relación
    if (updateMaterialDto.standId) {
      const stand = await this.standRepository.findOne({ where: { id: updateMaterialDto.standId } });
      if (!stand) throw new Error('Stand no encontrado');
      material.stand = stand;
    }

    this.materialRepository.merge(material, updateMaterialDto);
    const updated = await this.materialRepository.save(material);

    // Devuelve solo standId en la respuesta
    return {
      ...updated,
      standId: updated.stand?.id,
      standName: updated.stand?.name
    };
  }

  async remove(id: string): Promise<void> {
    const material = await this.materialRepository.findOne({ where: { id } });
    if (!material) throw new Error('Material no encontrado');
    material.isActive = false;
    await this.materialRepository.save(material);
  }
}
