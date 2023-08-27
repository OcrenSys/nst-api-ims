import {
  DataSource,
  DeleteResult,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import {
  Injectable,
  HttpStatus,
  BadRequestException,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map } from 'rxjs';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Image } from '../../database/models/image.entity';
import { Variant } from '../../database/models/variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../database/models/product.entity';
import {
  setOptionsRelation,
  setOptionsWhere,
} from '../../common/helpers/validators';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ResponseHttp> {
    const { images, variants, ...toCreateProduct } = createProductDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const product = await this.productRepository.create({
        ...toCreateProduct,
        variants: variants.map((toCreateVariant: Variant) =>
          this.variantRepository.create(toCreateVariant),
        ),
        images: images.map((toCreateImage: Image) =>
          this.imageRepository.create(toCreateImage),
        ),
      });

      if (!product) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          message: 'Lo sentimos, no se ha podido crear el nuevo producto.',
        });
      }

      await this.productRepository.save(product);

      await queryRunner.commitTransaction();

      return {
        status: HttpStatus.CREATED,
        error: null,
        data: { ...product },
        message: '¡Producto creado exitosamente!',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handleExceptions(
        error,
        'Algo salió mal al crear un nuevo producto.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(
    _filters?:
      | unknown
      | FindOptionsWhere<Product>[]
      | FindOptionsWhere<Product>,
  ): Promise<ResponseHttp> {
    const {
      skip = 0,
      take = 100,
      where = {},
      relations = [],
    } = (_filters || {}) as any;
    const _where = {
      ...setOptionsWhere(where),
    };
    const _relations = setOptionsRelation(relations) || [
      'subCategory',
      'variants',
    ];
    const _options = {
      relations: _relations,
      where: _where,
      ...(skip ? { skip: +skip } : {}),
      ...(take ? { take: +take } : {}),
    };
    let products: Product[] = [];

    try {
      products = await this.productRepository.find(_options);

      return {
        status: HttpStatus.OK,
        error: null,
        data: [...products],
        message: '¡Productos encontrados exitosamente!',
      };
    } catch (error) {
      this.handleExceptions(
        error,
        'Algo salió mal al encontrar los productos.',
      );
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['subCategory', 'variants'];

    const product: Product = await this.productRepository.findOne({
      relations: [...relations],
      where: { ...filters },
    });

    if (!product)
      this.handleExceptions(
        { code: HttpStatus.NOT_FOUND },
        `Producto con id: "${id}" no pudo ser encontrado`,
      );

    return {
      status: HttpStatus.OK,
      error: null,
      data: { ...product },
      message: '¡Producto encontrado exitosamente!',
    };
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseHttp> {
    const { images, variants, ...toUpdate } = updateProductDto;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      const product = await this.productRepository.preload({
        id,
        ...toUpdate,
      });

      if (!product)
        this.handleExceptions(
          { code: HttpStatus.NOT_FOUND },
          `Producto con id: "${id}" no pudo ser encontrado`,
        );

      await queryRunner.connect();
      await queryRunner.startTransaction();

      if (variants.length) {
        await queryRunner.manager.delete(Variant, { product: { id } });

        product.variants = variants.map((variant: Variant) =>
          this.variantRepository.create(variant),
        );
      }

      if (images.length) {
        await queryRunner.manager.delete(Image, { product: { id } });

        product.images = images.map((image: Image) =>
          this.imageRepository.create(image),
        );
      }

      await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return {
        status: HttpStatus.OK,
        error: null,
        data: { ...product },
        message: '¡Producto actualizado exitosamente!',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException();
    }
  }

  async remove(id: number): Promise<any> {
    const product: Product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product)
      this.handleExceptions(
        { code: HttpStatus.NOT_FOUND },
        `Producto con id: "${id}" no pudo ser encontrado`,
      );

    return from(this.productRepository.delete(id)).pipe(
      map((result: DeleteResult) => {
        return { ...result };
      }),
    );
  }

  handleExceptions(error, message?: string) {
    this.logger.error(error);
    const data = {
      error,
      message: message || 'Ocurrió un error inesperado.',
      timestamp: new Date().toISOString(),
    };

    if (error.code === HttpStatus.NOT_FOUND)
      throw new NotFoundException({
        ...data,
        status: HttpStatus.NOT_FOUND,
      });

    if (error.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException({
        ...data,
        status: HttpStatus.BAD_REQUEST,
      });

    throw new InternalServerErrorException({
      ...data,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
