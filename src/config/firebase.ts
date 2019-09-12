import admin from 'firebase-admin';
import * as serviceCreds from './../../firebase-config.json';
import Config from './config.js';

const serviceAccount = serviceCreds as admin.ServiceAccount;

export default function(): void {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: Config.FIREBASE_ADMIN_DB_URL,
  });
}
