import { Repository, DataSource, DeleteResult } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { Product } from '../products/entities/product.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { from, map } from 'rxjs';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCategoryDto: CreateBrandDto): Promise<ResponseHttp> {
    const { ...toCreateBrand } = createCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const brand: Brand = await this.brandRepository.create({
      ...toCreateBrand,
    });

    if (!brand) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear la nueva marca.',
      );
    }

    try {
      await this.brandRepository.save(brand);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: brand,
        statusCode: HttpStatus.CREATED,
        message: 'Categorye creada exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear la nueva variante.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['products'];
    try {
      const brands = await this.brandRepository.find({
        where: filters,
        relations: relations,
      });

      return this.handle.success({
        data: brands,
        message: 'Marcas encontradas exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar las marcas');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id: id };
    const relations = [];

    const brand: Brand = await this.brandRepository.findOne({
      relations: relations,
      where: filters,
    });

    if (!brand)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Marca con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: brand,
      message: 'Marca encontrada exitosamente!',
    });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<any> {
    const { ...toUpdateBrand } = updateBrandDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const brand: Brand = await this.brandRepository.preload({
      id,
      ...toUpdateBrand,
    });

    if (!brand) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear la nueva categoria.',
      );
    }

    try {
      this.brandRepository.save(brand);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: brand,
        statusCode: HttpStatus.OK,
        message: `Marca ${brand.name} has sido actualizada exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al actualizar la marca');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const brand = await this.brandRepository.findOne({
      where: { id: id },
    });

    if (!brand) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Marca con id: "${id}" no pudo ser encontrado`,
      );
    }

    try {
      const result = await this.brandRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Marca ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al eliminar la marca');
    }
  }
}
