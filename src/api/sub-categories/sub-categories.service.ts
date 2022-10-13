import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from './entities/sub-category.entity';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}
  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<ResponseHttp> {
    const { ...toSubCreateCategory } = createSubCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const subCategory: SubCategory = await this.subCategoryRepository.create({
        ...toSubCreateCategory,
      });

      if (!subCategory) {
        this.handle.throw(
          { code: HttpStatus.BAD_REQUEST },
          'Lo sentimos, no se ha podido crear la nueva sub categoria.',
        );
      }

      await this.subCategoryRepository.save(subCategory);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: subCategory,
        statusCode: HttpStatus.CREATED,
        message: 'Sub Categoria creada exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear la sub categoria.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = [];

    try {
      const subCategories = await this.subCategoryRepository.find({
        where: filters,
        relations: relations,
      });

      return this.handle.success({
        data: subCategories,
        message: 'Sub Categorias encontradas exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id: id };
    const relations = [];

    const subCategory: SubCategory = await this.subCategoryRepository.findOne({
      relations: relations,
      where: filters,
    });

    if (!subCategory)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Sub Categoria con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: subCategory,
      message: 'Sub Categoria encontrada exitosamente!',
    });
  }

  async update(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<ResponseHttp> {
    const { ...toUpdateVariant } = updateSubCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const subCategory: SubCategory = await this.subCategoryRepository.preload(
        {
          id,
          ...toUpdateVariant,
        },
      );

      if (!subCategory) {
        this.handle.throw(
          { code: HttpStatus.BAD_REQUEST },
          'Lo sentimos, no se ha podido crear la nueva sub categoria.',
        );
      }

      this.subCategoryRepository.save(subCategory);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: subCategory,
        statusCode: HttpStatus.OK,
        message: `Sub Categoria ${subCategory.name} has sido actualizada exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al actualizar la sub categoria');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const subCategory = this.subCategoryRepository.findOne({
      where: { id: id },
    });

    if (!subCategory) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Sub Categoria con id: "${id}" no pudo ser encontrado`,
      );
    }
    try {
      const result: DeleteResult = await this.subCategoryRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Categoria ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al eliminar la sub categoria');
    }
  }
}
