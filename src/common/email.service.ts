import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { EmailPayload } from './models/email-payload.model';
AWS.config.region = 'us-east-1';
import { renderFile } from 'ejs';
import { join, dirname } from 'path';
import { IEmailConfirmation } from 'src/user/schemas/email-confirmation.schema';
import { URL } from 'url';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendEmailConfirmation(
    emailConfirmation: IEmailConfirmation,
  ): Promise<void> {
    const emailPayload = new EmailPayload();
    emailPayload.to = emailConfirmation.user.email;
    emailPayload.subject = 'FitApp Community Email Confirmation';

    const confirmUrl = new URL(
      `/confirm-email/${emailConfirmation.token}`,
      process.env.API_ROOT_URL,
    ).toString();
    emailPayload.html = await this.renderTemplate('email-confirmation', {
      name: emailConfirmation.user.name || '',
      confirmUrl,
    });

    await this.send(emailPayload);
  }

  private async renderTemplate(
    template: string,
    params: object = {},
  ): Promise<string> {
    return await renderFile(
      join(dirname(__filename), './email-templates', `${template}.ejs`),
      params,
    );
  }

  private async send(payload: EmailPayload): Promise<void> {
    this.logger.log(
      `Sending email to ${payload.to}, subject: ${payload.subject}, content: ${
        payload.text
      } ${payload.html}`,
    );

    const params: any = {
      Destination: {
        CcAddresses: [],
        ToAddresses: [payload.to.toLowerCase()],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: 'UTF-8',
            Data: payload.html,
          },
          Text: {
            Charset: 'UTF-8',
            Data: payload.text,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: payload.subject,
        },
      },
      Source: process.env.EMAIL_SENDER /* required */,
      ReplyToAddresses: [
        process.env.EMAIL_REPLY_TO,
        /* more items */
      ],
    };

    // Create the promise and SES service object
    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' })
      .sendEmail(params)
      .promise();

    // Handle promise's fulfilled/rejected states
    sendPromise
      .then((snsData: any) => {
        this.logger.log(snsData.MessageId);
      })
      .catch(err => {
        this.logger.error(err, err.stack);
      });
  }
}
