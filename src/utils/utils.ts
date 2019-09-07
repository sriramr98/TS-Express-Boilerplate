import jwt from 'jsonwebtoken';
import Config from './../config/config';

export function createJwt(payload: object, isRefresh = false): string {
  return jwt.sign(payload, Config.JWT_SECRET, {
    expiresIn:
      isRefresh === true
        ? Config.JWT_REFRESH_EXPIRES_IN
        : Config.JWT_EXPIRES_IN,
  });
}
