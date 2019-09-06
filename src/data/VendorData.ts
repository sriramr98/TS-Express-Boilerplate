import VendorModel from './../models/Vendor';
import Vendor from './../types/models/Vendor.type';
import RegisterInput from '../types/input/RegisterInput.type';

export default class VendorData {
  static async getVendorWithEmail(email: string): Promise<Vendor | null> {
    return await VendorModel.findOne({
      email,
    });
  }

  static async insertVendor(vendor: RegisterInput): Promise<Vendor | null> {
    return await new VendorModel(vendor).save();
  }
}
