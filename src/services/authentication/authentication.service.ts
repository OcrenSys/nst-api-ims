import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

type TServiceAccount = {
  type?: string;
  project_id?: string;
  private_key_id?: string;
  private_key?: string;
  client_email?: string;
  client_id?: string;
  auth_uri?: string;
  token_uri?: string;
  auth_provider_x509_cert_url?: string;
  client_x509_cert_url?: string;
  universe_domain?: string;
};

@Injectable()
export class AuthenticationService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const {
      private_key = '',
      client_email = '',
      project_id = '',
    }: TServiceAccount = process.env.SERVICE_ACCOUNT as TServiceAccount;

    const serviceAccount: ServiceAccount = {
      projectId: project_id,
      clientEmail: client_email,
      privateKey: private_key,
    };

    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });
  }

  getAuth = (): firebase.auth.Auth => {
    try {
      return this.firebaseApp.auth();
    } catch (error) {
      return null;
    }
  };

  firestore = (): firebase.firestore.Firestore => {
    try {
      return this.firebaseApp.firestore();
    } catch (error) {
      return null;
    }
  };
}
