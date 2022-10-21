import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { from, map } from 'rxjs';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SubCategory } from '../sub-categories/entities/sub-category.entity';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { Category } from './entities/category.entity';
import { Banner } from '../banners/entities/banner.entity';
import { Image } from '../images/entities/image.entity';

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
        subcategories: subCategories.map((s: SubCategory) =>
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
        message: 'Categorye creada exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear la nueva variante.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const filters = {};
    const relations = ['subcategories', 'banner'];

    try {
      const categories = await this.categoryRepository.find({
        where: filters,
        relations,
      });

      /* const categories = await this.dataSource
        .getRepository(Category)
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.banner', 'banner')
        .leftJoinAndSelect('category.image', 'image')
        .select(['category', 'banner.name', 'banner.description'])
        .execute(); */

      return this.handle.success({
        data: categories,
        message: 'Categorias encontradas exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['subcategories', 'banner'];

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
      message: 'Categoria encontrada exitosamente!',
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
        message: `Categoria ${category.name} has sido actualizada exitosamente,`,
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
}
