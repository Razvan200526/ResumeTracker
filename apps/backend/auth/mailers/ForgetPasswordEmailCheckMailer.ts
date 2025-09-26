import { getMailer } from '@backend/shared/mail/getMailer';
import type { Mailer } from '@backend/shared/mail/types';
import { ForgetPasswordEmailCheckTemplate } from './ForgetPasswordEmailCheckTemplate';
import { renderTemplate } from './renderers';

export class ForgetPasswordEmailCheckMailer {
  private readonly mailer: Mailer;
  constructor() {
    this.mailer = getMailer();
  }

  public async send(config: { to: string; otp: string; lang?: string }) {
    const html = renderTemplate(
      ForgetPasswordEmailCheckTemplate({ otp: config.otp }),
    );
    await this.mailer.send({
      to: [config.to],
      subject: 'Reset your password',
      html,
    });
  }
}
