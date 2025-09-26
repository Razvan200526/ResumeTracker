import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import type { Mailer, SendMailParams } from './types';

function parseBool(val: string | undefined, def = false): boolean {
  if (val === undefined) return def;
  return ['1', 'true', 'yes', 'on'].includes(val.toLowerCase());
}

export class PrimaryMailer implements Mailer {
  private useResend = Boolean(process.env.RESEND_API_KEY);
  private resend = this.useResend ? new Resend(Bun.env.RESEND_API_KEY) : null;

  private smtp = nodemailer.createTransport({
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

    if (this.useResend && this.resend) {
      await this.resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      return;
    }

    await this.smtp.sendMail({
      from,
      to,
      subject,
      html,
    });
  }
}
