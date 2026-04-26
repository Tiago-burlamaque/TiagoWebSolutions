import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export type MailPayload = {
  fromName: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
};

export async function sendMail(payload: MailPayload) {
  return transporter.sendMail({
    from: `"${payload.fromName}" <${env.SMTP_USER}>`,
    to: env.MAIL_TO,
    replyTo: payload.replyTo,
    subject: payload.subject,
    text: payload.text,
    html: payload.html,
  });
}
