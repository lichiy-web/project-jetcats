import { ONE_MINUTE, TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { dontSleep } from './utils/ping.js';

const bootstrap = async () => {
  dontSleep(10 * ONE_MINUTE);
  // dontSleep(1000);
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  setupServer();
};

bootstrap();
