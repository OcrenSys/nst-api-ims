import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Order } from '../../database/models/order.entity';
import { PaymentDate } from '../../database/models/payment-date.entity';
import { Payment } from '../../database/models/payment.entity';
import { Percent } from '../../database/models/percent.entity';
import { CreateCreditDto } from './dto/create-credit.dto';
import { UpdateCreditDto } from './dto/update-credit.dto';
import { Credit } from '../../database/models/credit.entity';

@Injectable()
export class CreditsService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
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
      order = null,
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
      if (order) credit.order = this.OrderRepository.create(order);

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
        status: HttpStatus.CREATED,
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
    const relations = ['order', 'payments', 'paymentDates', 'percent'];
    try {
      const credits: Credit[] = await this.creditRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: credits,
        message: 'Creditos encontrados exitosamente.',
        status: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar los creditos.');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['order', 'payments', 'paymentDates', 'percent'];

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
      status: HttpStatus.OK,
      data: credit,
      message: 'Credito encontrado exitosamente!',
    });
  }

  async update(
    id: number,
    updateCreditDto: UpdateCreditDto,
  ): Promise<ResponseHttp> {
    const {
      order = null,
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
      if (order) credit.order = this.OrderRepository.create(order);

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
        status: HttpStatus.OK,
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
        status: HttpStatus.OK,
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
