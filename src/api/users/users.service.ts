import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Member } from '../members/entities/member.entity';
import { FirebaseUser } from 'src/common/models/firebase-user';
import { Role } from '../roles/entities/role.entity';
import { ResponseHttp } from 'src/common/interfaces/response.http';
import { HandleExceptions } from 'src/common/helpers/handle.exceptions';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(FirebaseUser)
    private readonly firebaseUserRepository: Repository<FirebaseUser>,
    private readonly handle: HandleExceptions,
    private readonly dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseHttp> {
    const { member = null, roles = [], ...toCreateUser } = createUserDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user: User = await this.userRepository.create({
      ...toCreateUser,
    });

    if (!user) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo usuario.',
      );
    }

    try {
      if (member) user.member = this.memberRepository.create(member);

      if (roles.length)
        user.roles = roles.map((r: Role) => this.roleRepository.create(r));

      await this.userRepository.save(user);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: user,
        statusCode: HttpStatus.CREATED,
        message: 'Usuario creado exitosamente!',
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(error, 'Algo salió mal al crear el nuevo usuario.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<ResponseHttp> {
    const filters = {};
    const relations = ['roles', 'member'];
    try {
      const users = await this.userRepository.find({
        where: filters,
        relations: relations,
      });

      return this.handle.success({
        data: users,
        message: 'Usuarios encontradas exitosamente.',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al encontrar los usuarios');
    }
  }

  async findOne(user_id: string): Promise<ResponseHttp> {
    const filters = {
      user_id: user_id,
    };
    const relations = ['roles'];

    const user = await this.userRepository.findOne({
      relations: relations,
      where: {
        ...filters,
      },
    });
    if (!user) throw new NotFoundException();

    return this.handle.success({
      data: user,
      statusCode: HttpStatus.OK,
      message: 'Usuario encontrado exitosamente!',
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { member = null, roles = [], ...toUpdateUser } = updateUserDto;
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const user: User = await this.userRepository.preload({
      id,
      ...toUpdateUser,
    });

    if (!user) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear la nueva marca.',
      );
    }

    try {
      if (member) user.member = this.memberRepository.create(member);

      if (roles.length)
        user.roles = roles.map((r: Role) => this.roleRepository.create(r));

      await this.userRepository.save(user);

      this.userRepository.save(user);

      await queryRunner.commitTransaction();

      return this.handle.success({
        data: user,
        statusCode: HttpStatus.OK,
        message: `Usuario has sido actualizadO exitosamente,`,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.handle.throw(
        error,
        'Algo salió mal al actualizar los datos de usurio',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      this.handle.throw(
        { code: HttpStatus.NOT_FOUND },
        `Usuario no pudo ser encontrado`,
      );
    }

    try {
      const result = await this.userRepository.delete(id);

      return this.handle.success({
        data: result,
        statusCode: HttpStatus.OK,
        message: `Usuario ha sido eliminado exitosamente,`,
      });
    } catch (error) {
      this.handle.throw(error, 'Algo salió mal al eliminar el usuario');
    }
  }
}
