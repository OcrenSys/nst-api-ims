import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult, Like } from 'typeorm';
import { from, map } from 'rxjs';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SubCategory } from '../../database/models/sub-category.entity';
import { Category } from '../../database/models/category.entity';
import { Banner } from '../../database/models/banner.entity';
import { Image } from '../../database/models/image.entity';
import {
  ACTION_CREATE,
  ACTION_DELETE,
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

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
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

      if (!category)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_CREATE.error(MODEL.Category),
          },
          ACTION_CREATE.error(MODEL.Category),
        );

      await this.categoryRepository.save(category);

      await queryRunner.commitTransaction();

      return {
        data: category,
        status: HttpStatus.CREATED,
        message: ACTION_CREATE.success(MODEL.Category),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Category),
        },
        ACTION_FIND.error(MODEL.Product),
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(_filters: any = {}): Promise<any> {
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

      return {
        data: categories,
        status: HttpStatus.OK,
        message: ACTION_FIND.success(MODEL.Category),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        {
          data: error,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_FIND.error(MODEL.Category),
        },
        ACTION_FIND.error(MODEL.Product),
      );
    }
  }

  async findOne(id: number): Promise<any> {
    const filters = { id };
    const relations = ['subCategories', 'banner'];

    const category: Category = await this.categoryRepository.findOne({
      relations,
      where: filters,
    });

    if (!category)
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_FIND.error(MODEL.Category, ONLY_ONE),
        },
        ACTION_FIND.error(MODEL.Category, ONLY_ONE),
      );

    return {
      status: HttpStatus.OK,
      data: category,
      message: ACTION_FIND.success(MODEL.Category, ONLY_ONE),
    };
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

      if (!category)
        return new NotFoundException(
          {
            data: null,
            status: HttpStatus.NOT_FOUND,
            message: ACTION_UPDATE.error(MODEL.Category),
          },
          ACTION_UPDATE.error(MODEL.Category),
        );

      if (banner) this.bannerRepository.create(banner);

      if (image) this.imageRepository.create(image);

      if (subCategories.length)
        subCategories.map((s: SubCategory) =>
          this.subCategoryRepository.create(s),
        );

      this.categoryRepository.save(category);

      await queryRunner.commitTransaction();

      return {
        data: category,
        status: HttpStatus.OK,
        message: ACTION_UPDATE.success(MODEL.Category),
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      return new InternalServerErrorException(
        {
          data: null,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ACTION_UPDATE.error(MODEL.Category),
        },
        ACTION_UPDATE.error(MODEL.Category),
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const category = this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      return new NotFoundException(
        {
          data: null,
          status: HttpStatus.NOT_FOUND,
          message: ACTION_DELETE.error(MODEL.Category),
        },
        ACTION_DELETE.error(MODEL.Category),
      );
    }

    return from(this.categoryRepository.delete(id)).pipe(
      map((result: DeleteResult) => {
        return {
          data: { ...result },
          status: HttpStatus.OK,
          message: ACTION_DELETE.success(MODEL.Category),
        };
      }),
    );
  }

  async reorder(categories: Category[]): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
}
