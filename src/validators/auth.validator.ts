import { body, ValidationChain } from 'express-validator/check';

export default class AuthValidator {
  static validateRegisterInput: Array<ValidationChain> = [
    body('name', 'Name nust not be empty')
      .exists()
      .trim(),
    body('email', 'Email cannot be empty')
      .isEmail()
      .withMessage('Need a valid email'),
    body('password', 'Password must not be empty').exists(),
    body('contactNo', 'Need a valid contact number')
      .exists()
      .isMobilePhone('en-IN'),
    body('referralCode')
      .optional()
      .isString(),
  ];

  static validateLoginInput: Array<ValidationChain> = [
    body('email', 'Need a valid email')
      .exists()
      .isEmail(),
    body('password', 'Need a valid password')
      .exists()
      .isLength({ min: 5 }),
  ];
}
