import path from 'node:path';

export const AVAILABLE_ROUTES = {
  availableRoutes: [
    '/',
    '/auth/register',
    '/auth/login',
    '/auth/logout',
    '/auth/refresh',
    '/send-reset-email',
    '/reset-pwd',
    '/uploads',
    '/api-docs',
    '/users/current',
    '/transactions',
    '/transactions/summary',
    '/transactions/:transactionId',
  ],
  availableQueries: {
    get: [
      '/',
      '/uploads',
      '/users/current',
      '/transactions/summary?period=yyyy-mm',
    ],
    post: [
      '/auth/register',
      '/auth/login',
      '/auth/logout',
      '/auth/refresh',
      '/send-reset-email',
      '/reset-pwd',
      '/transactions/:transactionId',
    ],
    delete: ['/transactions/:transactionId'],
    put: [],
    patch: ['/transactions/:transactionId'],
  },
};

// ліміти на довжину імені користувача
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 32;

// ліміти на довжину email-адреси
export const EMAIL_MIN_LENGTH = 2;
export const EMAIL_MAX_LENGTH = 64;

// ліміти на довжину паролю
export const PWD_MIN_LENGTH = 2;
export const PWD_MAX_LENGTH = 64;
// сіль для хешування паролю
export const PWD_HASH_SALT = 10;

export const TOKEN_LENGTH = 30;
export const UNIQUE_SUFFIX_LENGTN = 16;

export const ONE_MINUTE = 60 * 1000;
export const ONE_DAY = 24 * 60 * ONE_MINUTE;

// Терміни дії токенів
export const ACCES_TOKEN_SHELF_LIFE = 0.1 * ONE_MINUTE;
export const REFRESH_TOKEN_SHELF_LIFE = 30 * ONE_DAY;

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const SMTP = {
  HOST: 'SMTP_HOST',
  PORT: 'SMTP_PORT',
  USER: 'SMTP_USER',
  PASSWORD: 'SMTP_PASSWORD',
  FROM: 'SMTP_FROM',
};
export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve('temp');
export const UPLOAD_DIR = path.resolve('uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
