import nodemailer from 'nodemailer';
import type { Mailer, SendMailParams } from './types';

export class DevMailer implements Mailer {
  private transporter = nodemailer.createTransport({
    url: Bun.env.DEV_MAILER_DSN || 'smtp://localhost:1025',
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
