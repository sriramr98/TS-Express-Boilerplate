import { Schema, model, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  contactNo: string;
  address: string;
  referralCode?: string;
}

const UserSchema: Schema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  referralCode: String,
});

const UserModel = model<User>('user', UserSchema);

export default UserModel;
