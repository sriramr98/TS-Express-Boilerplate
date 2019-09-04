class Config {
  static PORT: number = parseInt(process.env.PORT || '3000');
  static MONGODB_URI: string =
    process.env.MONGODB_URI || 'mongodb://localhost:27017/appdb';
}

export default Config;
