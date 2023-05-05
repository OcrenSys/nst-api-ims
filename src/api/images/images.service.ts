import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Banner } from '../../database/models/banner.entity';
import { Category } from '../../database/models/category.entity';
import { Product } from '../../database/models/product.entity';
import { SubCategory } from '../../database/models/sub-category.entity';
import { Variant } from '../../database/models/variant.entity';
import { Image } from '../../database/models/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Banner)
    private readonly bannerRepository: Repository<Banner>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<ResponseHttp> {
    const {
      banner,
      category,
      product,
      subCategory,
      variant,
      ...toCreateImage
    } = createImageDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const image: Image = this.imageRepository.create({ ...toCreateImage });

      if (banner) image.banner = this.bannerRepository.create(banner);

      if (category) image.category = this.categoryRepository.create(category);

      if (subCategory)
        image.subCategory = this.subCategoryRepository.create(subCategory);

      if (product) image.product = this.productRepository.create(product);

      if (variant) image.variant = this.variantRepository.create(variant);

      this.imageRepository.save(image);
      await queryRunner.commitTransaction();

      return this.handle.success({
        data: image,
        status: HttpStatus.OK,
        message: 'Imagen creada exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = [
      'banner',
      'category',
      'subCategory',
      'product',
      'variant',
    ];

    try {
      const images = await this.imageRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: images,
        status: HttpStatus.OK,
        message: 'Imagenes encontradas con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = [
      'banner',
      'category',
      'subCategory',
      'product',
      'variant',
    ];

    const image: Image = await this.imageRepository.findOne({
      relations,
      where: filters,
    });

    if (!image)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Imagen con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      status: HttpStatus.OK,
      data: image,
      message: 'Imagen encontrada exitosamente!',
    });
  }

  async update(
    id: number,
    updateImageDto: UpdateImageDto,
  ): Promise<ResponseHttp> {
    const {
      banner,
      category,
      product,
      subCategory,
      variant,
      ...toUpdateImage
    } = updateImageDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const image: Image = await this.imageRepository.preload({
      id,
      ...toUpdateImage,
    });

    if (!image) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos de la imagen.',
      );
    }

    if (banner) this.bannerRepository.create(banner);

    if (category) this.categoryRepository.create(category);

    if (subCategory) this.subCategoryRepository.create(subCategory);

    if (product) this.productRepository.create(product);

    if (variant) this.variantRepository.create(variant);

    try {
      this.imageRepository.save(image);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: image,
        status: HttpStatus.OK,
        message: `Imagen has sido actualizada exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos del imagen.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<ResponseHttp> {
    const image = await this.imageRepository.findOne({
      where: { id },
    });

    if (!image) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Imagen con id: "${id}" no pudo ser encontrada.`,
      );
    }

    try {
      const result = await this.imageRepository.delete(id);

      return this.handle.success({
        data: result,
        status: HttpStatus.OK,
        message: `Imagen ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos de la imagen.',
      );
    }
  }
}
