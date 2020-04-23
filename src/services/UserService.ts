import UserModel, { User } from '@models/User';
import admin from 'firebase-admin';

export default class UserService {
  static async createNewUser(user: Partial<User>) {
    return await new UserModel(user).save();
  }

  static async getAllUsers(): Promise<User[]> {
    return await UserModel.find()
      .lean<User>()
      .exec();
  }

  static async deleteAllUsers(): Promise<void> {
    await UserModel.deleteMany({});
  }

  static async findUserById(id: string): Promise<User | null> {
    return await UserModel.findById(id)
      .lean<User>()
      .exec();
  }

  static getUserMeta(
    user: User,
    userToken: admin.auth.DecodedIdToken,
  ): {
    missingFields: Array<String>;
    hasCompletedRegistration: Boolean;
    hasVerifiedEmail: Boolean;
  } {
    const missingFields = [];
    if (!user.name) missingFields.push('name');
    if (!user.address) missingFields.push('address');
    if (!user.contactNo) missingFields.push('contactNo');

    const hasCompletedRegistration = missingFields.length === 0;

    const hasVerifiedEmail = userToken.email_verified;

    return {
      missingFields,
      hasCompletedRegistration,
      hasVerifiedEmail,
    };
  }
}
