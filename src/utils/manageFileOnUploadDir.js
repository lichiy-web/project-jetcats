import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async file => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar('UPLOAD_DOMAIN')}/uploads/${file.filename}`;
};

export const deleteFileFromUploadDir = async fileUrl => {
  const filename = path.parse(fileUrl).base;
  await fs.unlink(path.join(UPLOAD_DIR, filename));
};
