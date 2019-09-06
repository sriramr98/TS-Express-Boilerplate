import { Schema, model } from 'mongoose';
import Vendor from './../types/models/Vendor.type';

const VendorSchema: Schema = new Schema({
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

const VendorModel = model<Vendor>('vendor', VendorSchema);

export default VendorModel;
