import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class AuthenticationService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const serviceAccount: ServiceAccount = {
      projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
      clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
      privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
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
