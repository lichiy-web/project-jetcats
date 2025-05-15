import { getEnvVar } from './getEnvVar.js';
import { saveFileToCloudinary } from './manageFileOnCloudinary.js';
import { saveFileToUploadDir } from './manageFileOnUploadDir.js';

export const saveFileAndGetUrl = file =>
  file &&
  (getEnvVar('ENABLE_CLOUDINARY') === 'true'
    ? saveFileToCloudinary(file)
    : saveFileToUploadDir(file));
