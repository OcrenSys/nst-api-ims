import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { Product } from '../products/entities/product.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<ResponseHttp> {
    const { products = [], ...toCreateSection } = createSectionDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const section = this.sectionRepository.create({
        ...toCreateSection,
      });

      if (products.length)
        section.products = products.map((p: Product) =>
          this.productRepository.create(p),
        );

      this.sectionRepository.save(section);
      await queryRunner.commitTransaction();

      return this.handle.success({
        data: section,
        statusCode: HttpStatus.OK,
        message: 'Sección creada exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = [];

    try {
      const section = await this.sectionRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: section,
        statusCode: HttpStatus.OK,
        message: 'Secciones encontradas con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = [];

    const section: Section = await this.sectionRepository.findOne({
      relations,
      where: filters,
    });

    if (!section)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Sección con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: section,
      message: 'Banner encontrada exitosamente!',
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto): Promise<any> {
    const { products = [], ...toUpdateSection } = updateSectionDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const section: Section = await this.sectionRepository.preload({
      id,
      ...toUpdateSection,
    });

    if (!section) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear la nueva sección.',
      );
    }

    if (products.length)
      section.products = products.map((p: Product) =>
        this.productRepository.create(p),
      );

    try {
      this.sectionRepository.save(section);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: section,
        statusCode: HttpStatus.OK,
        message: `Sección ${section.name} has sido actualizada exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al actualizar el banner');
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const section = await this.sectionRepository.findOne({
      where: { id },
    });

    if (!section) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Sección con id: "${id}" no pudo ser encontrada.`,
      );
    }

    try {
      const result = await this.sectionRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Sección ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al eliminar la sección.');
    }
  }
}
