import { inject, injectable } from '@/di';
import { isEmpty } from 'lodash';
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

export type SendEmailRequest = {
  from: string;
  to: string[];
  subject: string;
  html?: string;
  text?: string;
};

@injectable()
export class Mailer {
  constructor(@inject(SESClient) protected sesClient: SESClient) {
  }

  async send(request: SendEmailRequest) {
    await this.sesClient.send(this.createCommand(request));
  }

  protected createCommand(
    request: SendEmailRequest,
  ): SendEmailCommand {
    const { html, text, to, subject, from } = request;

    const params = {
      Destination: {
        ToAddresses: to,
      },
      Source: from,
    } as any;

    if (!isEmpty(html))
      params.Message = {
        Subject: { Data: subject },
        Body: { Html: { Data: html } },
      };
    else if (!isEmpty(text))
      params.Message = {
        Subject: { Data: subject },
        Body: { Text: { Data: text } },
      };

    return new SendEmailCommand(params);
  }
}
