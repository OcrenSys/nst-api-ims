import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../../database/models/role.entity';
import { UsersService } from 'src/api/users/users.service';
import { RoleEnum } from '../../common/enums/roles.enum';
import * as bcrypt from 'bcrypt';
import { User } from '../../database/models/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ email, password }): Promise<User | null> {
    const {
      data: { user },
    } = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return user;
    }
    return null;
  }

  async login({ email, sub }) {
    const payload = { username: email, sub: sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginWeb(user: User) {
    const payload = { username: user.email, sub: user.id };

    if (user.roles.some((role: Role) => role.name !== RoleEnum.Admin))
      throw new HttpException(
        { message: 'This user does not have the required permission' },
        401,
      );
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updatePassword(update) {
    // if (update.password === update.verified_password) {
    //   await this.usersService.update(update.id, {
    //     password: encryptPassword(update.password),
    //   });
    // }
  }

  async verifyToken(verifyToken) {
    // const date = new Date();
    // const decoded: any = jwt.decode(verifyToken.token);
    // return decoded.exp < date.getDate() / 1000;
    return null;
  }
}
