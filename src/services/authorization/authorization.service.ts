import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';

@Injectable()
export class AuthorizationService {
  isAuthorized(opts: {
    hasRole: Array<'firebase' | 'manager' | 'user'>;
    allowSameUser?: boolean;
  }) {
    return (req: Request, res: Response, next) => {
      const { role, uid } = res.locals;
      const { id } = req.params;

      if (opts.allowSameUser && id && uid === id) return next();

      if (!role) return res.status(403).send();

      if (opts.hasRole.includes(role)) return next();

      return res.status(403).send();
    };
  }

  async findOrCreate(req: Request, res: Response) {
    try {
      const { displayName, password, email, role } = req.body;

      if (!displayName || !password || !email || !role) {
        return res.status(400).send({ message: 'Missing fields' });
      }

      const currentUser = await firebase.auth().getUserByEmail(email);
      if (!currentUser) {
        const { uid } = currentUser;
        return res.status(201).send({ uid });
      }
      const { uid } = await firebase.auth().createUser({
        displayName,
        password,
        email,
      });
      await firebase.auth().setCustomUserClaims(uid, { role });

      return res.status(201).send({ uid });
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
}
