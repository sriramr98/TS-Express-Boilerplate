import UserModel from '../models/User';
import User from '../types/models/User.type';
import RegisterInput from '../types/input/RegisterInput.type';

export default class VendorData {
  static async getUserWithEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({
      email,
    });
  }

  static async insertUser(user: RegisterInput): Promise<User | null> {
    return await new UserModel(user).save();
  }
}
