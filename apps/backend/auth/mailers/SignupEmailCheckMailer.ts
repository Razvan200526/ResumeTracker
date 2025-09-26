import { getMailer } from '@backend/shared/mail/getMailer';
import type { Mailer } from '@backend/shared/mail/types';
import { renderTemplate } from './renderers';
import { SignupEmailCheckTemplate } from './SignupEmailCheckTemplate';

export class SignupEmailCheckMailer {
  private readonly mailer: Mailer;
  constructor() {
    this.mailer = getMailer();
  }

  public async send(config: { to: string; otp: string; lang?: string }) {
    const html = renderTemplate(SignupEmailCheckTemplate({ otp: config.otp }));
    await this.mailer.send({
      to: [config.to],
      subject: 'Verify your email',
      html,
    });
  }
}
