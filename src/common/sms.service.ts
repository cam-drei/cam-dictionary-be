import { Injectable, Logger } from '@nestjs/common';

import * as AWS from 'aws-sdk';
AWS.config.region = 'us-east-1';
const sns = new AWS.SNS();

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendText(phone: string, message: string): Promise<void> {
    this.logger.log(`Start sending text to ${phone} with content: ${message}`);

    const params = {
      Message: message,
      PhoneNumber: phone,
    };

    const publishTextPromise = sns.publish(params).promise();
    publishTextPromise
      .then(data => this.logger.log('MessageID is ' + data.MessageId))
      .catch(err => this.logger.error(err, err.stack));
  }
}
