import { User } from '../../api/users/entities/user.entity';

export class FirebaseUser {
  name: string;

  picture: string;

  iss: string;

  aud: string;

  user_id: string;

  auth_time: number;

  sub: string;

  iat: number;

  exp: number;

  email: string;

  email_verified: boolean;

  firebase: Firebase;

  user?: User;
}

class Firebase {
  identities: any;

  sign_in_provider: string;
}
