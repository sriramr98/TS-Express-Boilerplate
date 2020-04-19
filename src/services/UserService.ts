import UserModel, { User } from '@models/User';

export default class UserService {
  static async createNewUser(user: Partial<User>) {
    return await new UserModel(user).save();
  }

  static async getAllUsers(): Promise<User[]> {
    return await UserModel.find().lean<User>().exec();
  }

  static async deleteAllUsers(): Promise<void> {
    await UserModel.deleteMany({});
  }

  static async findUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id).lean<User>().exec();
  }
}
