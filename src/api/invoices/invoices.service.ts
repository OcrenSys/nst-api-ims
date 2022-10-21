import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../..common/helpers/handle.exceptions';
import { ResponseHttp } from '../..common/interfaces/response.http';
import { Credit } from '../credits/entities/credit.entity';
import { Customer } from '../customers/entities/customer.entity';
import { InvoicesDetail } from '../invoices-details/entities/invoices-detail.entity';
import { Member } from '../members/entities/member.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoicesDetail)
    private readonly invoiceDetailRepository: Repository<InvoicesDetail>,
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
        invoiceDetails: invoiceDetails
          ? invoiceDetails.map((invoiceDetail: InvoicesDetail) =>
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

    const invoice: Invoice = await this.invoiceRepository.findOne({
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

    const invoice: Invoice = await this.invoiceRepository.preload({
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
        invoiceDetails: invoiceDetails
          ? invoiceDetails.map((invoiceDetail: InvoicesDetail) =>
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
