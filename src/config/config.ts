const config = {
  PORT: parseInt(process.env.PORT || '3000'),
  MONGODB_URI:
    process.env.MONGODB_URI ||
    `mongodb://${
      process.env.MONGODB_USERNAME || 'localhost'
    }:27017/ts-boilerplate`,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || '10'),
  JWT_SECRET: process.env.JWT_SECRET || 'sdfalfakj2ijlksga',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '10d',
  FIREBASE_ADMIN_DB_URL: process.env.FIREBASE_ADMIN_DB_URL,
  ENV: process.env.NODE_ENV || 'development',
};

export default config;
