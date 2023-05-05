import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Order } from '../../database/models/order.entity';
import { Person } from '../../database/models/person.entity';
import { User } from '../../database/models/user.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from '../../database/models/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<ResponseHttp> {
    const {
      person = null,
      user = null,
      orders = [],
      ...toCreateBrand
    } = createMemberDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const member: Member = await this.memberRepository.create({
      ...toCreateBrand,
      person: person ? this.personRepository.create(person) : null,
      user: user ? this.userRepository.create(user) : null,
      orders: orders.length
        ? orders.map((_order: Order) =>
            this.orderRepository.create(_order),
          )
        : [],
    });

    if (!member) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo miembro.',
      );
    }

    try {
      await this.memberRepository.save(member);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: member,
        status: HttpStatus.CREATED,
        message: 'Miembro creado exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear el nuevo miembro.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['user', 'person', 'orders'];
    try {
      const brands = await this.memberRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: brands,
        message: 'Miembros encontrados exitosamente.',
        status: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar las miembros.');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['user', 'person', 'orders'];

    const member: Member = await this.memberRepository.findOne({
      relations,
      where: filters,
    });

    if (!member)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Miembro con id: "${id}" no pudo ser encontrado.`,
      );

    return this.handle.success({
      status: HttpStatus.OK,
      data: member,
      message: 'Miembro encontrado exitosamente.',
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<any> {
    const {
      person = null,
      user = null,
      orders = [],
      ...toUpdateBrand
    } = updateMemberDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const member: Member = await this.memberRepository.preload({
      id,
      ...toUpdateBrand,
      person: person ? this.personRepository.create(person) : null,
      user: user ? this.userRepository.create(user) : null,
      orders: orders.length
        ? orders.map((_order: Order) =>
            this.orderRepository.create(_order),
          )
        : [],
    });

    if (!member) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo miembro.',
      );
    }

    try {
      this.memberRepository.save(member);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: member,
        status: HttpStatus.OK,
        message: `datos del miembro han sido actualizados exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos del miembro.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const member: Member = await this.memberRepository.findOne({
      where: { id },
    });

    if (!member) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Miembro con id: "${id}" no pudo ser encontrado`,
      );
    }

    try {
      const result = await this.memberRepository.delete(id);

      return this.handle.success({
        data: result,
        status: HttpStatus.OK,
        message: `Miembro ha sido eliminado exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos del miembro.',
      );
    }
  }
}
