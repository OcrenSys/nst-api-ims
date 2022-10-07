import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UsersService } from '../../api/users/users.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;
  constructor(
    private authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
  ) {
    this.auth = authenticationService.getAuth();
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;

    if (token != undefined && token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          const user = await this.usersService.findOne(decodedToken.user_id);

          if (!user) req['data'] = { decodedToken };
          else req['data'] = { decodedToken, user: user };

          next();
        })
        .catch(() => {
          AuthenticationMiddleware.accessDenied(req.url, res);
        });
    } else {
      AuthenticationMiddleware.accessDenied(req.url, res);
    }
  }

  private static accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Acceso deneado, iniciar sesion para continuar.',
    });
  }
}
