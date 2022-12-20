import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, DeleteResult } from 'typeorm';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { Customer } from '../customers/entities/customer.entity';
import { Member } from '../members/entities/member.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPersonDto: CreatePersonDto): Promise<ResponseHttp> {
    const {
      customer = null,
      member = null,
      ...toCreateInvoice
    } = createPersonDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person: Person = this.personRepository.create({
        ...toCreateInvoice,
        customer: customer ? this.customerRepository.create(customer) : null,
        member: member ? this.memberRepository.create(member) : null,
      });

      this.personRepository.save(person);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: person,
        statusCode: HttpStatus.OK,
        message: 'Datos personales creados exitosamente.',
      });
    } catch (error) {
      this.handle.throw(error);
    } finally {
      queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['customer', 'member'];

    try {
      const persons: Person[] = await this.personRepository.find({
        where: filters,
        relations,
      });

      return this.handle.success({
        data: persons,
        statusCode: HttpStatus.OK,
        message: 'Datos personales encontrados con exito.',
      });
    } catch (error) {
      this.handle.throw(error);
    }
  }

  async findOne(id: number): Promise<ResponseHttp> {
    const filters = { id };
    const relations = ['customer', 'member'];

    const person: Person = await this.personRepository.findOne({
      relations,
      where: filters,
    });

    if (!person)
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Datos personales con id: "${id}" no pudieron ser encontrado.`,
      );

    return this.handle.success({
      statusCode: HttpStatus.OK,
      data: person,
      message: 'Datos personales encontrados exitosamente!',
    });
  }

  async update(
    id: number,
    updatePersonDto: UpdatePersonDto,
  ): Promise<ResponseHttp> {
    const {
      customer = null,
      member = null,
      ...toUpdatePerson
    } = updatePersonDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person: Person = await this.personRepository.preload({
        id,
        ...toUpdatePerson,
        customer: customer ? this.customerRepository.create(customer) : null,
        member: member ? this.memberRepository.create(member) : null,
      });

      const result = await this.personRepository.save(person);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Datos personales han sido actualizados exitosamente.`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos personales.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<ResponseHttp> {
    const person: Person = await this.personRepository.findOne({
      where: { id },
    });

    if (!person) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Los datos personales no pudieron ser encontrados.`,
      );
    }

    try {
      const result: DeleteResult = await this.personRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Los datos personales han sido eliminados exitosamente.`,
      });
    } catch (error) {
      this.handle.throw(
        error,
        'Algo salió mal al eliminar los datos personales.',
      );
    }
  }
}
