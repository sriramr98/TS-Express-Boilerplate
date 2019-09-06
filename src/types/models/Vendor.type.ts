import { Document } from 'mongoose';
export default interface Vendor extends Document {
  name: string;
  email: string;
  password: string;
  contactNo: string;
  referralCode?: string;
}