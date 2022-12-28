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
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Variant)
    private readonly variantRepository: Repository<Variant>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    createorderDetailsDto: CreateOrdersDetailDto,
  ): Promise<ResponseHttp> {
    const {
      product = null,
      variant = null,
      order = null,
      ...toCreateorderDetails
    } = createorderDetailsDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderDetails = this.orderDetailsRepository.create({
        ...toCreateorderDetails,
        product: product ? this.productRepository.create(product) : null,
        variant: variant ? this.variantRepository.create(variant) : null,
        order: order ? this.orderRepository.create(order) : null,
      });

      this.orderDetailsRepository.save(orderDetails);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: orderDetails,
        status: HttpStatus.OK,
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
    const relations = ['product', 'variant', 'order'];

    try {
      const orderDetails: OrderDetail[] =
        await this.orderDetailsRepository.find({
          where: filters,
          relations,
        });

      return this.handle.success({
        data: orderDetails,
        status: HttpStatus.OK,
        message: 'Detalles de facturas encontrados con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['product', 'variant', 'order'];

    const orderDetail: OrderDetail =
      await this.orderDetailsRepository.findOne({
        relations,
        where: filters,
      });

    if (!orderDetail)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Detalle de factura con id: "${id}" no pudo ser encontrado.`,
      );

    return this.handle.success({
      status: HttpStatus.OK,
      data: orderDetail,
      message: 'Detalle de factura encontrado exitosamente!',
    });
  }

  async update(
    id: number,
    updateorderDetailsDto: UpdateOrdersDetailDto,
  ): Promise<any> {
    const {
      product = null,
      variant = null,
      order = null,
      ...toUpdateorderDetail
    } = updateorderDetailsDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const orderDetail: OrderDetail =
      await this.orderDetailsRepository.preload({
        id,
        ...toUpdateorderDetail,
        product: product ? this.productRepository.create(product) : null,
        variant: variant ? this.variantRepository.create(variant) : null,
        order: order ? this.orderRepository.create(order) : null,
      });

    if (!orderDetail) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos del detalle de factura.',
      );
    }

    try {
      this.orderDetailsRepository.save(orderDetail);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: orderDetail,
        status: HttpStatus.OK,
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
    const orderDetail = await this.orderDetailsRepository.findOne({
      where: { id },
    });

    if (!orderDetail) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Detalle de factura con id: "${id}" no pudo ser encontrado.`,
      );
    }

    try {
      const result = await this.orderDetailsRepository.delete(id);

      return this.handle.success({
        data: result,
        status: HttpStatus.OK,
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
