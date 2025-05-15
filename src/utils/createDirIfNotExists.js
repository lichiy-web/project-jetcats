import fs from 'node:fs/promises';

export const createDirIfNotExists = path =>
  fs.access(path).catch(err => {
    if (err.code === 'ENOENT') fs.mkdir(path);
  });
