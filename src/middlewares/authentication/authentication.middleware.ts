import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private auth: firebase.auth.Auth;

  constructor(private authenticationService: AuthenticationService) {
    this.auth = authenticationService.getAuth();
  }

  use(req: Request, res: Response, next: () => void) {
    const token = req.headers.authorization;

    if (token != undefined && token != null && token != '') {
      this.auth
        .verifyIdToken(token.replace('Bearer ', ''))
        .then(async (decodedToken) => {
          req['user'] = {
            email: decodedToken.email,
            roles: decodedToken.roles || [],
            type: decodedToken.type,
          };
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
      message: 'access denied',
    });
  }
}
