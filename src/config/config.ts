class Config {
  static PORT: number = parseInt(process.env.PORT || '3000');
  static MONGODB_URI: string =
    process.env.MONGODB_URI ||
    `mongodb://${process.env.MONGODB_USERNAME ||
    'localhost'}:27017/ts-boilerplate`;
  static FIREBASE_ADMIN_DB_URL = process.env.FIREBASE_ADMIN_DB_URL;
}

export default Config;
