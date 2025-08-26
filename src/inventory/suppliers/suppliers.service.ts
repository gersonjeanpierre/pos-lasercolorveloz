import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Injectable()
export class SuppliersService {

  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.suppliersRepository.create({
      ...createSupplierDto,
      id: createSupplierDto.id ?? uuid()
    });
    return await this.suppliersRepository.save(supplier);
  }

  async findAll() {
    return await this.suppliersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} supplier`;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.suppliersRepository.findOne({ where: { id } });

    if (!supplier) throw new Error(`Proveedor no encontrado`);

    this.suppliersRepository.merge(supplier, updateSupplierDto);
    return await this.suppliersRepository.save(supplier);
  }

  remove(id: number) {
    return `This action removes a #${id} supplier`;
  }
}
