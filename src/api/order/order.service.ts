import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Credit } from '../../database/models/credit.entity';
import { Customer } from '../../database/models/customer.entity';
import { OrderDetail } from '../../database/models/order-detail.entity';
import { Member } from '../../database/models/member.entity';
import { CreateInvoiceDto } from './dto/create-order.dto';
import { UpdateInvoiceDto } from './dto/update-order.dto';
import { Order } from '../../database/models/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private readonly invoiceRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly invoiceDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<ResponseHttp> {
    const {
      credit = null,
      customer = null,
      invoiceDetails = [],
      member = null,
      ...toCreateInvoice
    } = createInvoiceDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const invoice = this.invoiceRepository.create({
        ...toCreateInvoice,
        credit: credit ? this.creditRepository.create(credit) : null,
        member: member ? this.memberRepository.create(member) : null,
        customer: customer ? this.customerRepository.create(customer) : null,
        orderDetails: invoiceDetails
          ? invoiceDetails.map((invoiceDetail: OrderDetail) =>
              this.invoiceDetailRepository.create(invoiceDetail),
            )
          : [],
      });

      this.invoiceRepository.save(invoice);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: invoice,
        statusCode: HttpStatus.OK,
        message: 'Factura creada exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['credit', 'customer', 'invoiceDetails', 'member'];

    try {
      const invoices = await this.invoiceRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: invoices,
        statusCode: HttpStatus.OK,
        message: 'Facturas encontradas con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['credit', 'customer', 'invoiceDetails', 'member'];

    const invoice: Order = await this.invoiceRepository.findOne({
      relations,
      where: filters,
    });

    if (!invoice)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Factura con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: invoice,
      message: 'Datos de la factura encontrados exitosamente!',
    });
  }

  async update(id: number, updateInvoiceDto: UpdateInvoiceDto): Promise<any> {
    const {
      credit = null,
      customer = null,
      invoiceDetails = [],
      member = null,
      ...toUpdateInvoice
    } = updateInvoiceDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const invoice: Order = await this.invoiceRepository.preload({
      id,
      ...toUpdateInvoice,
    });

    if (!invoice) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos de la factura.',
      );
    }

    try {
      const invoice = this.invoiceRepository.create({
        ...toUpdateInvoice,
        credit: credit ? this.creditRepository.create(credit) : null,
        member: member ? this.memberRepository.create(member) : null,
        customer: customer ? this.customerRepository.create(customer) : null,
        orderDetails: invoiceDetails
          ? invoiceDetails.map((invoiceDetail: OrderDetail) =>
              this.invoiceDetailRepository.create(invoiceDetail),
            )
          : [],
      });

      this.invoiceRepository.save(invoice);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: invoice,
        statusCode: HttpStatus.OK,
        message: `Los datos de la factura han sido actualizados exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos de la factura.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
    });

    if (!invoice) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Los datos de la factura no pudieron ser encontrados.`,
      );
    }

    try {
      const result = await this.invoiceRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `La Factura ha sido eliminada exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos de la factura.',
      );
    }
  }
}
