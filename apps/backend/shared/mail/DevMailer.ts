import nodemailer from 'nodemailer';
import type { Mailer, SendMailParams } from './types';

function parseBool(val: string | undefined, def = false): boolean {
  if (val === undefined) return def;
  return ['1', 'true', 'yes', 'on'].includes(val.toLowerCase());
}

export class DevMailer implements Mailer {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: Number(process.env.SMTP_PORT || 1025),
    secure: parseBool(process.env.SMTP_SECURE, false),
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });

  async send({
    to,
    subject,
    html,
    fromEmail,
    fromName,
  }: SendMailParams): Promise<void> {
    const from = `${fromName || 'Resume Tracker'} <${fromEmail || process.env.MAIL_FROM || 'no-reply@localhost'}>`;

    await this.transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
