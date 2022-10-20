import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { Credit } from '../credits/entities/credit.entity';
import { Payment } from '../payments/entities/payment.entity';
import { CreatePercentDto } from './dto/create-percent.dto';
import { UpdatePercentDto } from './dto/update-percent.dto';
import { Percent } from './entities/percent.entity';

@Injectable()
export class PercentsService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Percent)
    private readonly percentRepository: Repository<Percent>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPercentDto: CreatePercentDto): Promise<ResponseHttp> {
    const { credits = [], ...toCreateInvoice } = createPercentDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const percent: Percent = this.percentRepository.create({
        ...toCreateInvoice,
        credits: credits.length
          ? credits.map((_credit: Credit) =>
              this.creditRepository.create(_credit),
            )
          : [],
      });

      this.percentRepository.save(percent);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: percent,
        statusCode: HttpStatus.OK,
        message: 'Porcentaje creado exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['credits'];

    try {
      const percents: Percent[] = await this.percentRepository.find({
        where: filters,
        relations: relations,
      });

      return this.handle.success({
        data: percents,
        statusCode: HttpStatus.OK,
        message: 'Porcentajes encontrados con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id: id };
    const relations = ['credits'];

    const percent: Percent = await this.percentRepository.findOne({
      relations: relations,
      where: filters,
    });

    if (!percent)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `El porcentaje con id: "${id}" no pudo ser encontrado.`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: percent,
      message: 'Datos del porcentaje encontrados exitosamente!',
    });
  }

  async update(id: number, updatePaymentDto: UpdatePercentDto): Promise<any> {
    const { credits = [], ...toUpdateInvoice } = updatePaymentDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const percent: Percent = await this.percentRepository.preload({
        id,
        ...toUpdateInvoice,
        credits: credits.length
          ? credits.map((_credit: Credit) =>
              this.creditRepository.create(_credit),
            )
          : [],
      });

      const result = await this.percentRepository.save(percent);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Los datos del porcentaje han sido actualizados exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos del porcentaje.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const percent: Percent = await this.percentRepository.findOne({
      where: { id: id },
    });

    if (!percent) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Los datos del porcentaje no pudieron ser encontrados.`,
      );
    }

    try {
      const result: DeleteResult = await this.percentRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `El porcentaje ha sido eliminado exitosamente.`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos del porcentaje.',
      );
    }
  }
}
