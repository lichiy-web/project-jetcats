import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.HOST),
  port: Number(getEnvVar(SMTP.PORT)),
  secure: false,
  auth: {
    user: getEnvVar(SMTP.USER),
    pass: getEnvVar(SMTP.PASSWORD),
  },
});

export const sendEmail = option => transporter.sendMail(option);
