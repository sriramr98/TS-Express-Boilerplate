class Config {
  static PORT: number = parseInt(process.env.PORT || '3000');
  static MONGODB_URI: string =
    process.env.MONGODB_URI ||
    `mongodb://${process.env.MONGODB_USERNAME ||
      'localhost'}:27017/ts-boilerplate`;
  static SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS || '10');
  static JWT_SECRET: string = process.env.JWT_SECRET || 'somejibberishsecret';
  static JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || '1d';
  static JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '10d';
  static FIREBASE_ADMIN_DB_URL = process.env.FIREBASE_ADMIN_DB_URL;
}

export default Config;
