import { Document } from 'mongoose';
import StoreDetail from './StoreDetail.type';

export default interface Vendor extends Document {
  name: string;
  email: string;
  password: string;
  contactNo: string;
  referralCode?: string;
}
