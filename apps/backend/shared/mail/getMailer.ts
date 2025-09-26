import { DevMailer } from './DevMailer';
import { PrimaryMailer } from './PrimaryMailer';
import type { Mailer } from './types';

export function getMailer(): Mailer {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd || process.env.RESEND_API_KEY) {
    return new PrimaryMailer();
  }
  return new DevMailer();
}
