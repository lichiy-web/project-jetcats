import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/Session.js';
import { UserCollection } from '../db/models/User.js';
import { RES_MSG } from '../constants/res-msg.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(
      createHttpError(401, RES_MSG[401].default, {
        details: RES_MSG[401].noAuthHeader,
      }),
    );
    return;
  }

  const [authType, accessToken] = authHeader.split(' ');
  if (authType !== 'Bearer' || !accessToken) {
    next(
      createHttpError(401, RES_MSG[401].default, {
        details: RES_MSG[401].notBearer,
      }),
    );
    return;
  }

  const session = await SessionCollection.findOne({ accessToken });
  if (!session) {
    next(
      createHttpError(401, RES_MSG[401].default, {
        details: RES_MSG[401].noSession,
      }),
    );
    return;
  }

  const isSessionExpired = new Date() > new Date(session.accessTokenValidUntil);
  if (isSessionExpired) {
    next(
      createHttpError(401, RES_MSG[401].default, {
        details: RES_MSG[401].accessTokenExpired,
      }),
    );
    return;
  }

  const user = await UserCollection.findById(session.userId);
  if (!user) {
    next(
      createHttpError(401, RES_MSG[401].default, {
        details: RES_MSG[401].noUser,
      }),
    );
    return;
  }

  req.user = user;
  next();
};
