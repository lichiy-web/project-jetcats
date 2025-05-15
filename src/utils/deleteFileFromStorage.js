import { CLOUDINARY } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';
import { deleteFileFromCloudinary } from './manageFileOnCloudinary.js';
import { deleteFileFromUploadDir } from './manageFileOnUploadDir.js';

export const deleteFileFromStorage = fileUrl =>
  fileUrl &&
  (fileUrl.includes(getEnvVar(CLOUDINARY.CLOUD_NAME))
    ? deleteFileFromCloudinary(fileUrl)
    : deleteFileFromUploadDir(fileUrl));
