import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { FirebaseUser } from '../../common/models/firebase-user';
import { ResponseHttp } from '../../common/helpers/interfaces/response.http';
import { HandleExceptions } from '../../common/helpers/handle.exceptions';
import { Role } from '../../database/models/role.entity';
import { Member } from '../../database/models/member.entity';
import { User } from '../../database/models/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
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

    const user: User = this.userRepository.create({
      ...toCreateUser,
      member: member ? this.memberRepository.create(member) : null,
      roles: roles.length
        ? roles.map((r: Role) => this.roleRepository.create(r))
        : [],
    });

    if (!user) {
      this.handle.throw(
        { code: HttpStatus.BAD_REQUEST },
        'Lo sentimos, no se ha podido crear el nuevo usuario.',
      );
    }

    try {
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
        relations,
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
      user_id,
    };
    const relations = ['roles'];

    const user = await this.userRepository.findOne({
      relations,
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

  async findByEmail(email: string): Promise<ResponseHttp> {
    const filters = {
      email,
    };
    const relations = ['roles'];

    const user = await this.userRepository.findOne({
      relations,
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
      where: { id },
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
