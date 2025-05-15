import { RES_MSG } from '../constants/res-msg.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  resetPassword,
  sendResetEmail,
} from '../services/auth.js';
import { setupSession } from '../utils/setupSession.js';

export const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: RES_MSG[201].registerUser,
    data: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: RES_MSG[200].loginUser,
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshUserSession({
    sessionId,
    refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].refreshUserSession,
    data: { accessToken: session.accessToken },
  });
};

export const sendResetEmailController = async (req, res) => {
  await sendResetEmail(req.body.email);

  res.status(200).json({
    status: 200,
    message: RES_MSG[200].sendResetEmail,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.status(200).json({
    status: 200,
    message: RES_MSG[200].resetPwd,
    data: {},
  });
};
