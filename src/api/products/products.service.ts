import { DataSource, DeleteResult, Repository } from 'typeorm';
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
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { Image } from '../images/entities/image.entity';
import { Variant } from '../variants/entities/variant.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

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
          statusCode: HttpStatus.BAD_REQUEST,
          timestamp: new Date().toISOString(),
          message: 'Lo sentimos, no se ha podido crear el nuevo producto.',
        });
      }

      await this.productRepository.save(product);

      await queryRunner.commitTransaction();

      return {
        statusCode: HttpStatus.CREATED,
        timestamp: new Date().toISOString(),
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

  async findAll(): Promise<ResponseHttp> {
    let products: Product[] = [];
    const filters = {};
    const relations = ['subCategory', 'variants'];

    try {
      products = await this.productRepository.find({
        relations: [...relations],
        where: { ...filters },
      });

      return {
        statusCode: HttpStatus.OK,
        timestamp: new Date().toISOString(),
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
    const filters = { id: id };
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
      statusCode: HttpStatus.OK,
      timestamp: new Date().toISOString(),
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
        statusCode: HttpStatus.OK,
        timestamp: new Date().toISOString(),
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
      where: { id: id },
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
      error: error,
      message: message || 'Ocurrió un error inesperado.',
      timestamp: new Date().toISOString(),
    };

    if (error.code === HttpStatus.NOT_FOUND)
      throw new NotFoundException({
        ...data,
        statusCode: HttpStatus.NOT_FOUND,
      });

    if (error.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException({
        ...data,
        statusCode: HttpStatus.BAD_REQUEST,
      });

    throw new InternalServerErrorException({
      ...data,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
