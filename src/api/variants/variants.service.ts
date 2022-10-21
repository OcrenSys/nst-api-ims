import { DataSource, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { from, map } from 'rxjs';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { Image } from '../images/entities/image.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from './entities/variant.entity';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';

@Injectable()
export class VariantsService {
  constructor(
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createVariantDto: CreateVariantDto): Promise<ResponseHttp> {
    const {
      images = [],
      product = null,
      ...toCreateVariant
    } = createVariantDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const variant: Variant = await this.variantRepository.create({
        ...toCreateVariant,
        product: product ? this.productRepository.create(product) : null,
        images: images.map((imageToCreate: Image) =>
          this.imageRepository.create(imageToCreate),
        ),
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
    const filters = { id };
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
      message: 'Variante encontrada exitosamente!',
    });
  }

  async update(id: number, updateVariantDto: UpdateVariantDto): Promise<any> {
    const { product = null, ...toUpdateVariant } = updateVariantDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const variant = await this.variantRepository.preload({
        id,
        ...toUpdateVariant,
      });

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
      where: { id },
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
