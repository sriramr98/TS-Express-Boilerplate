import admin from 'firebase-admin';
// FOR NOW. NEED TO FIND A FIX. DOESN'T WORK BECAUSE TS_PATHS STARTS FROM ./src
import * as serviceCreds from './../../firebase-config.json';
import Config from './config';

const serviceAccount = serviceCreds as admin.ServiceAccount;

export default function(): void {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: Config.FIREBASE_ADMIN_DB_URL,
  });
}
