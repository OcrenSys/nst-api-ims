import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult, Like } from 'typeorm';
import { from, map } from 'rxjs';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SubCategory } from '../../database/models/sub-category.entity';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Category } from '../../database/models/category.entity';
import { Banner } from '../../database/models/banner.entity';
import { Image } from '../../database/models/image.entity';
import {
  ACTION_CREATE,
  ACTION_FIND,
  ACTION_UPDATE,
  MODEL,
  ONLY_ONE,
} from '../../common/constants/messages.constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<ResponseHttp> {
    const {
      banner = null,
      image = null,
      subCategories = [],
      ...toCreateCategory
    } = createCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const category: Category = await this.categoryRepository.create({
        ...toCreateCategory,
        banner: banner ? this.bannerRepository.create(banner) : null,
        image: image ? this.imageRepository.create(image) : null,
        subCategories: subCategories.map((s: SubCategory) =>
          this.subCategoryRepository.create(s),
        ),
      });

      if (!category) {
        this.handle.throw(
          { code: HttpStatus.BAD_REQUEST },
          'Lo sentimos, no se ha podido crear la nueva categoria.',
        );
      }

      await this.categoryRepository.save(category);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: category,
        statusCode: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Category),
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear la nueva variante.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(_filters: any = {}) {
    const filters = {
      ..._filters,
      name: Like(`%${_filters?.name || ''}%`),
      description: Like(`%${_filters?.description || ''}%`),
    };
    const relations = [];

    try {
      const categories = await this.categoryRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: categories,
        statusCode: HttpStatus.OK,
        message: ACTION_FIND.error(MODEL.Category),
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['subCategories', 'banner'];

    const category: Category = await this.categoryRepository.findOne({
      relations,
      where: filters,
    });

    if (!category)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Categoria con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: category,
      message: ACTION_FIND.error(MODEL.Category, ONLY_ONE),
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const {
      banner = null,
      image = null,
      subCategories = [],
      ...toUpdateVariant
    } = updateCategoryDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const category: Category = await this.categoryRepository.preload({
        id,
        ...toUpdateVariant,
      });

      if (!category) {
        this.handle.throw(
          { code: HttpStatus.BAD_REQUEST },
          'Lo sentimos, no se ha podido crear la nueva categoria.',
        );
      }

      if (banner) this.bannerRepository.create(banner);

      if (image) this.imageRepository.create(image);

      if (subCategories.length)
        subCategories.map((s: SubCategory) =>
          this.subCategoryRepository.create(s),
        );

      this.categoryRepository.save(category);

      await queryRunner.commitTransaction();
      return this.handle.success({
        data: category,
        statusCode: HttpStatus.OK,
        message: ACTION_UPDATE.error(MODEL.Category),
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw({
        statusCode: error.code,
        message: error.message,
        stack: error.stack,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const category = this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Categoria con id: "${id}" no pudo ser encontrado`,
      );
    }

    return from(this.categoryRepository.delete(id)).pipe(
      map((result: DeleteResult) => {
        return this.handle.success({
          data: { ...result },
          statusCode: HttpStatus.OK,
          message: `Categoria ha sido eliminada exitosamente,`,
        });
      }),
    );
  }

  async reorder(categories: Category[]): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
