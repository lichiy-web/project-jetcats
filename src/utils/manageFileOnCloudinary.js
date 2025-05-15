import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import path from 'node:path';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async file => {
  const response = await cloudinary.v2.uploader.upload(file.path);

  await fs.unlink(file.path);
  return response.secure_url;
};

export const deleteFileFromCloudinary = async fileUrl => {
  const publicId = path.parse(fileUrl).name;
  await cloudinary.v2.api.delete_resources(publicId);
};
