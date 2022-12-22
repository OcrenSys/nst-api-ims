import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Order } from '../../database/models/order.entity';
import { Product } from '../../database/models/product.entity';
import { Variant } from '../../database/models/variant.entity';
import { CreateOrdersDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrdersDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from '../../database/models/order-detail.entity';

@Injectable()
export class OrdersDetailsService {
  constructor(
    @InjectRepository(Order)
    private readonly invoiceRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly invoiceDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createInvoiceDetailsDto: CreateOrdersDetailDto,
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
        order: invoice ? this.invoiceRepository.create(invoice) : null,
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
      const invoiceDetails: OrderDetail[] =
        await this.invoiceDetailsRepository.find({
          where: filters,
          relations,
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
    const filters = { id };
    const relations = ['product', 'variant', 'invoice'];

    const invoiceDetail: OrderDetail =
      await this.invoiceDetailsRepository.findOne({
        relations,
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
    updateInvoiceDetailsDto: UpdateOrdersDetailDto,
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

    const invoiceDetail: OrderDetail =
      await this.invoiceDetailsRepository.preload({
        id,
        ...toUpdateinvoiceDetail,
        product: product ? this.productRepository.create(product) : null,
        variant: variant ? this.variantRepository.create(variant) : null,
        order: invoice ? this.invoiceRepository.create(invoice) : null,
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
      where: { id },
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
