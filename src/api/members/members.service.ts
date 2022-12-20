import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Invoice } from '../invoices/entities/invoice.entity';
import { Person } from '../person/entities/person.entity';
import { User } from '../users/entities/user.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<ResponseHttp> {
    const {
      person = null,
      user = null,
      invoices = [],
      ...toCreateBrand
    } = createMemberDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const member: Member = await this.memberRepository.create({
      ...toCreateBrand,
      person: person ? this.personRepository.create(person) : null,
      user: user ? this.userRepository.create(user) : null,
      invoices: invoices.length
        ? invoices.map((_invoice: Invoice) =>
            this.invoiceRepository.create(_invoice),
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
        statusCode: HttpStatus.CREATED,
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
    const relations = ['user', 'person', 'invoices'];
    try {
      const brands = await this.memberRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: brands,
        message: 'Miembros encontrados exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar las miembros.');
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['user', 'person', 'invoices'];

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
      statusCode: HttpStatus.OK,
      data: member,
      message: 'Miembro encontrado exitosamente.',
    });
  }

  async update(id: number, updateMemberDto: UpdateMemberDto): Promise<any> {
    const {
      person = null,
      user = null,
      invoices = [],
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
      invoices: invoices.length
        ? invoices.map((_invoice: Invoice) =>
            this.invoiceRepository.create(_invoice),
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
        statusCode: HttpStatus.OK,
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
        statusCode: HttpStatus.OK,
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
