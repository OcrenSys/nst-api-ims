import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEnum } from '../../common/enums/roles.enum';
import { ROLES_KEY } from '../../decorators/role.decorator';
import { Role } from '../../api/roles/entities/role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    try {
      if (!requiredRoles) {
        return true;
      }

      const { data } = context.switchToHttp().getRequest();

      return data?.roles.some((role: Role) =>
        requiredRoles.includes(role.name),
      );
    } catch (error) {
      throw new UnauthorizedException({
        ...error,
        statusCode: HttpStatus.FORBIDDEN,
        timestamp: new Date().toISOString(),
        message: 'No tiene los permisos necesarios para continuar.',
      });
    }
  }
}
