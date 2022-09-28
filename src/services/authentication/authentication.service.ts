import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import servicesAccount from '../../../firebase-services-account.json';

@Injectable()
export class AuthenticationService {
  private firebaseApp: firebase.app.App;

  constructor() {
    const serviceAccount: ServiceAccount = {
      projectId: servicesAccount?.project_id || '',
      clientEmail: servicesAccount?.client_email || '',
      privateKey: servicesAccount?.private_key || '',
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
