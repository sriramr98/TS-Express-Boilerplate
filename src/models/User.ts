import { Schema, model } from 'mongoose';
import User from '../types/models/User.type';

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  referralCode: String,
});

const UserModel = model<User>('vendor', UserSchema);

export default UserModel;
