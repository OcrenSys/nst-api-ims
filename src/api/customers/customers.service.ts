import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Observable<Customer> {
    return from(this.customerRepository.save(createCustomerDto)).pipe(
      map((savedCustomer: Customer) => {
        return { ...savedCustomer };
      }),
    );
  }

  findAll() {
    const filters = {};
    const relations = ['invoices'];

    return this.customerRepository.find({
      relations,
      where: {
        ...filters,
      },
    });
  }

  async findOne(id: number) {
    const filters = {
      id,
    };
    const relations = ['invoices'];

    const customer = await this.customerRepository.findOne({
      relations,
      where: {
        ...filters,
      },
    });
    if (!customer) throw new NotFoundException();

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException();

    return from(this.customerRepository.update(id, updateCustomerDto)).pipe(
      map((result: UpdateResult) => {
        return {
          ...result,
          raw: {
            ...result.raw,
            customer: {
              ...customer,
              updateCustomerDto,
            },
          },
        };
      }),
    );
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) throw new NotFoundException();

    return from(this.customerRepository.delete(id)).pipe(
      map((result: DeleteResult) => {
        return {
          ...result,
          raw: {
            ...result.raw,
            customer: {
              ...customer,
            },
          },
        };
      }),
    );
  }
}
