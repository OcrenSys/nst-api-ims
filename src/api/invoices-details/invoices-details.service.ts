import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { Repository, DataSource } from 'typeorm';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Product } from '../products/entities/product.entity';
import { Variant } from '../variants/entities/variant.entity';
import { CreateInvoicesDetailDto } from './dto/create-invoices-detail.dto';
import { UpdateInvoicesDetailDto } from './dto/update-invoices-detail.dto';
import { InvoicesDetail } from './entities/invoices-detail.entity';

@Injectable()
export class InvoicesDetailsService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoicesDetail)
    private readonly invoiceDetailsRepository: Repository<InvoicesDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createInvoiceDetailsDto: CreateInvoicesDetailDto,
  ): Promise<ResponseHttp> {
    const {
      product = null,
      variant = null,
      invoice = null,
      ...toCreateInvoiceDetails
    } = createInvoiceDetailsDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const invoiceDetails = this.invoiceDetailsRepository.create({
        ...toCreateInvoiceDetails,
        product: product ? this.productRepository.create(product) : null,
        variant: variant ? this.variantRepository.create(variant) : null,
        invoice: invoice ? this.invoiceRepository.create(invoice) : null,
      });

      this.invoiceDetailsRepository.save(invoiceDetails);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: invoiceDetails,
        statusCode: HttpStatus.OK,
        message: 'Detalle de factura creado exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['product', 'variant', 'invoice'];

    try {
      const invoiceDetails: InvoicesDetail[] =
        await this.invoiceDetailsRepository.find({
          where: filters,
          relations: relations,
        });

      return this.handle.success({
        data: invoiceDetails,
        statusCode: HttpStatus.OK,
        message: 'Detalles de facturas encontrados con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id: id };
    const relations = ['product', 'variant', 'invoice'];

    const invoiceDetail: InvoicesDetail =
      await this.invoiceDetailsRepository.findOne({
        relations: relations,
        where: filters,
      });

    if (!invoiceDetail)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Detalle de factura con id: "${id}" no pudo ser encontrado.`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: invoiceDetail,
      message: 'Detalle de factura encontrado exitosamente!',
    });
  }

  async update(
    id: number,
    updateInvoiceDetailsDto: UpdateInvoicesDetailDto,
  ): Promise<any> {
    const {
      product = null,
      variant = null,
      invoice = null,
      ...toUpdateinvoiceDetail
    } = updateInvoiceDetailsDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const invoiceDetail: InvoicesDetail =
      await this.invoiceDetailsRepository.preload({
        id,
        ...toUpdateinvoiceDetail,
        product: product ? this.productRepository.create(product) : null,
        variant: variant ? this.variantRepository.create(variant) : null,
        invoice: invoice ? this.invoiceRepository.create(invoice) : null,
      });

    if (!invoiceDetail) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos del detalle de factura.',
      );
    }

    try {
      this.invoiceDetailsRepository.save(invoiceDetail);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: invoiceDetail,
        statusCode: HttpStatus.OK,
        message: `Detalle de factura ha sido actualizado exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar el detalle de factura ',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const invoiceDetail = await this.invoiceDetailsRepository.findOne({
      where: { id: id },
    });

    if (!invoiceDetail) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Detalle de factura con id: "${id}" no pudo ser encontrado.`,
      );
    }

    try {
      const result = await this.invoiceDetailsRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Detalle de factura ha sido eliminado exitosamente.`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos del detalle de factura.',
      );
    }
  }
}
