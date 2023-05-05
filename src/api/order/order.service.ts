import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Credit } from '../../database/models/credit.entity';
import { Customer } from '../../database/models/customer.entity';
import { OrderDetail } from '../../database/models/order-detail.entity';
import { Member } from '../../database/models/member.entity';
import { CreateorderDto } from './dto/create-order.dto';
import { UpdateorderDto } from './dto/update-order.dto';
import { Order } from '../../database/models/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createorderDto: CreateorderDto): Promise<ResponseHttp> {
    const {
      credit = null,
      customer = null,
      orderDetails = [],
      member = null,
      ...toCreateorder
    } = createorderDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepository.create({
        ...toCreateorder,
        credit: credit ? this.creditRepository.create(credit) : null,
        member: member ? this.memberRepository.create(member) : null,
        customer: customer ? this.customerRepository.create(customer) : null,
        orderDetails: orderDetails
          ? orderDetails.map((orderDetail: OrderDetail) =>
              this.orderDetailRepository.create(orderDetail),
            )
          : [],
      });

      this.orderRepository.save(order);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: order,
        status: HttpStatus.OK,
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
    const relations = ['credit', 'customer', 'orderDetails', 'member'];

    try {
      const orders = await this.orderRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: orders,
        status: HttpStatus.OK,
        message: 'Facturas encontradas con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['credit', 'customer', 'orderDetails', 'member'];

    const order: Order = await this.orderRepository.findOne({
      relations,
      where: filters,
    });

    if (!order)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Factura con id: "${id}" no pudo ser encontrada`,
      );

    return this.handle.success({
      status: HttpStatus.OK,
      data: order,
      message: 'Datos de la factura encontrados exitosamente!',
    });
  }

  async update(id: number, updateorderDto: UpdateorderDto): Promise<any> {
    const {
      credit = null,
      customer = null,
      orderDetails = [],
      member = null,
      ...toUpdateorder
    } = updateorderDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const order: Order = await this.orderRepository.preload({
      id,
      ...toUpdateorder,
    });

    if (!order) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido actualizar los datos de la factura.',
      );
    }

    try {
      const order = this.orderRepository.create({
        ...toUpdateorder,
        credit: credit ? this.creditRepository.create(credit) : null,
        member: member ? this.memberRepository.create(member) : null,
        customer: customer ? this.customerRepository.create(customer) : null,
        orderDetails: orderDetails
          ? orderDetails.map((orderDetail: OrderDetail) =>
              this.orderDetailRepository.create(orderDetail),
            )
          : [],
      });

      this.orderRepository.save(order);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: order,
        status: HttpStatus.OK,
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
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Los datos de la factura no pudieron ser encontrados.`,
      );
    }

    try {
      const result = await this.orderRepository.delete(id);

      return this.handle.success({
        data: result,
        status: HttpStatus.OK,
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
