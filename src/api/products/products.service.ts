import {
  Injectable,
  HttpStatus,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { DataSource, Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  handleExceptions(error, message?: string) {
    this.logger.error(error);

    if (error.code === HttpStatus.BAD_REQUEST)
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        timestamp: new Date().toISOString(),
        error: error,
        message: message || 'Algo salió mal, verifique los datos.',
      });

    throw new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      error: error,
      message: 'Ocurrió un error inesperado.',
    });
  }
}
