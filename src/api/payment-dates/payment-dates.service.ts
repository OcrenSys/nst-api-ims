import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Credit } from '../../database/models/credit.entity';
import { Payment } from '../../database/models/payment.entity';
import { CreatePaymentDateDto } from './dto/create-payment-date.dto';
import { UpdatePaymentDateDto } from './dto/update-payment-date.dto';
import { PaymentDate } from '../../database/models/payment-date.entity';

@Injectable()
export class PaymentDatesService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(PaymentDate)
    private readonly paymentDateRepository: Repository<PaymentDate>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPaymentDto: CreatePaymentDateDto): Promise<ResponseHttp> {
    const {
      credit = null,
      payment = null,
      ...toCreateorder
    } = createPaymentDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const paymentDate: PaymentDate = this.paymentDateRepository.create({
        ...toCreateorder,
        credit: credit ? this.creditRepository.create(credit) : null,
        payment: payment ? this.paymentRepository.create(payment) : null,
      });

      this.paymentDateRepository.save(paymentDate);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: paymentDate,
        statusCode: HttpStatus.OK,
        message: 'Fecha de pago creada exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['credit', 'payment'];

    try {
      const paymentDates: PaymentDate[] = await this.paymentDateRepository.find(
        {
          where: filters,
          relations,
        },
      );

      return this.handle.success({
        data: paymentDates,
        statusCode: HttpStatus.OK,
        message: 'Facturas encontradas con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['credit', 'payment'];

    const paymentDate: PaymentDate = await this.paymentDateRepository.findOne({
      relations,
      where: filters,
    });

    if (!paymentDate)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Fecha de pago con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: paymentDate,
      message: 'Datos de la fecha de pago encontrados exitosamente!',
    });
  }

  async update(
    id: number,
    updatePaymentDateDto: UpdatePaymentDateDto,
  ): Promise<any> {
    const {
      credit = null,
      payment = null,
      ...toUpdateorder
    } = updatePaymentDateDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const paymentDate: PaymentDate = await this.paymentDateRepository.preload(
        {
          id,
          ...toUpdateorder,
          credit: credit ? this.creditRepository.create(credit) : null,
          payment: payment ? this.paymentRepository.create(payment) : null,
        },
      );

      const result = await this.paymentDateRepository.save(paymentDate);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Los datos de la fecha de pago han sido actualizados exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos de la fecha de pago.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const paymentDate: PaymentDate = await this.paymentDateRepository.findOne({
      where: { id },
    });

    if (!paymentDate) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Los datos de la fecha de pago no pudieron ser encontrados.`,
      );
    }

    try {
      const result: DeleteResult = await this.paymentDateRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `La fecha de pago ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos de la fecha de pago.',
      );
    }
  }
}
