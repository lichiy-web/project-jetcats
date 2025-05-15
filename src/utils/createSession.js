import { randomBytes } from 'node:crypto';
import {
  ACCES_TOKEN_SHELF_LIFE,
  REFRESH_TOKEN_SHELF_LIFE,
  TOKEN_LENGTH,
} from '../constants/index.js';

export const itExpiresIn = period => new Date(Date.now() + period);

export const createSession = userId => {
  const accessToken = randomBytes(TOKEN_LENGTH).toString('base64');
  const refreshToken = randomBytes(TOKEN_LENGTH).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: itExpiresIn(ACCES_TOKEN_SHELF_LIFE),
    refreshTokenValidUntil: itExpiresIn(REFRESH_TOKEN_SHELF_LIFE),
  };
};
