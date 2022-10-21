import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/interfaces/response.http';
import { Invoice } from '../invoices/entities/invoice.entity';
import { PaymentDate } from '../payment-dates/entities/payment-date.entity';
import { Payment } from '../payments/entities/payment.entity';
import { Percent } from '../percents/entities/percent.entity';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from './entities/credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Percent)
    private readonly percentRepository: Repository<Percent>,
    @InjectRepository(PaymentDate)
    private readonly paymentDatesRepository: Repository<PaymentDate>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createCreditDto: CreateCreditDto): Promise<ResponseHttp> {
    const {
      invoice = null,
      percent = null,
      payments = [],
      paymentDates = [],
      ...toCreateCredit
    } = createCreditDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const credit: Credit = await this.creditRepository.create({
      ...toCreateCredit,
    });

    if (!credit) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo credito.',
      );
    }

    try {
      if (invoice) credit.invoice = this.invoiceRepository.create(invoice);

      if (percent) credit.percent = this.percentRepository.create(percent);

      if (payments.length)
        credit.payments.map((payment) =>
          this.paymentRepository.create(payment),
        );

      if (paymentDates.length)
        credit.paymentDates = paymentDates.map((paymentDate) =>
          this.paymentDatesRepository.create(paymentDate),
        );

      await this.creditRepository.save(credit);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: credit,
        statusCode: HttpStatus.CREATED,
        message: 'Credito creado exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear el nuevo credito.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['invoice', 'payments', 'paymentDates', 'percent'];
    try {
      const credits: Credit[] = await this.creditRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: credits,
        message: 'Creditos encontrados exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar los creditos.');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['invoice', 'payments', 'paymentDates', 'percent'];

    const credit: Credit = await this.creditRepository.findOne({
      relations,
      where: filters,
    });

    if (!credit)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Credito con id: "${id}" no pudo ser encontrado`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: credit,
      message: 'Credito encontrado exitosamente!',
    });
  }

  async update(
    id: number,
    updateCreditDto: UpdateCreditDto,
  ): Promise<ResponseHttp> {
    const {
      invoice = null,
      percent = null,
      payments = [],
      paymentDates = [],
      ...toUpdateCredit
    } = updateCreditDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const credit: Credit = await this.creditRepository.preload({
      id,
      ...toUpdateCredit,
    });

    if (!credit) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo credito.',
      );
    }

    try {
      if (invoice) credit.invoice = this.invoiceRepository.create(invoice);

      if (percent) credit.percent = this.percentRepository.create(percent);

      if (payments.length)
        credit.payments.map((payment) =>
          this.paymentRepository.create(payment),
        );

      if (paymentDates.length)
        credit.paymentDates = paymentDates.map((paymentDate) =>
          this.paymentDatesRepository.create(paymentDate),
        );

      this.creditRepository.save(credit);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: credit,
        statusCode: HttpStatus.OK,
        message: `Los datos del credito han sido actualizados exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos del credito.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<ResponseHttp> {
    const credit = await this.creditRepository.findOne({
      where: { id },
    });

    if (!credit) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Credito con id: "${id}" no pudo ser encontrado.`,
      );
    }

    try {
      const result: DeleteResult = await this.creditRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Credito ha sido eliminado exitosamente.`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos del credito.',
      );
    }
  }
}
