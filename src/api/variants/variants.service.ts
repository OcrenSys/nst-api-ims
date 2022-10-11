import { DataSource, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { Repository } from 'typeorm/repository/Repository';
import { Brand } from '../brands/entities/brand.entity';
import { Image } from '../images/entities/image.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { from, map } from 'rxjs';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<ResponseHttp> {
    const {
      images = [],
      product = null,
      brand = null,
      ...toCreateVariant
    } = createVariantDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const variant: Variant = await this.variantRepository.create({
        ...toCreateVariant,
        images: images.map((imageToCreate: Image) =>
          this.imageRepository.create(imageToCreate),
        ),
        product: product ? this.productRepository.create(product) : null,
        brand: brand ? this.brandRepository.create(brand) : null,
      });

      if (!variant) {
        this.handle.throw(
          { code: HttpStatus.BAD_REQUEST },
          'Lo sentimos, no se ha podido crear la nueva variante.',
        );
      }

      await this.variantRepository.save(variant);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: variant,
        statusCode: HttpStatus.CREATED,
        message: 'Variante creada exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear la nueva variante.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    let variants: Variant[] = [];
    const filters = {};
    const relations = ['product'];

    try {
      variants = await this.variantRepository.find({
        relations: [...relations],
        where: { ...filters },
      });

      return this.handle.success({
        statusCode: HttpStatus.OK,
        data: [...variants],
        message: 'Varaintes encontradas exitosamente!',
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar las variates.');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id: id };
    const relations = { product: true };
    const variant: Variant = await this.variantRepository.findOne({
      relations: { ...relations },
      where: { ...filters },
    });

    if (!variant)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Variante con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: { ...variant },
      message: 'Varainte encontrada exitosamente!',
    });
  }

  async update(id: number, updateVariantDto: UpdateVariantDto): Promise<any> {
    const {
      brand = null,
      product = null,
      ...toUpdateVariant
    } = updateVariantDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const variant = await this.variantRepository.preload({
        id,
        ...toUpdateVariant,
      });

      if (brand) variant.brand = this.brandRepository.create(brand);

      if (product) variant.product = this.productRepository.create(product);

      this.variantRepository.save(variant);

      await queryRunner.commitTransaction();
      return this.handle.success({
        data: { ...variant },
        statusCode: HttpStatus.OK,
        message: `Variante ${variant.name} has sido actualizada exitosamente,`,
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
    const variant = this.variantRepository.findOne({
      where: { id: id },
    });

    if (!variant) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Variante con id: "${id}" no pudo ser encontrado`,
      );
    }

    return from(this.variantRepository.delete(id)).pipe(
      map((result: DeleteResult) => {
        return this.handle.success({
          data: { ...result },
          statusCode: HttpStatus.OK,
          message: `Variante ha sido eliminada exitosamente,`,
        });
      }),
    );
  }
}
