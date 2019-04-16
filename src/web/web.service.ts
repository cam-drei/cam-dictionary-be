import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join, dirname } from 'path';

@Injectable()
export class WebService {
  public async renderEmailConfirmation(isSuccess: boolean): Promise<string> {
    return this.renderTemplate('email-confirmation', {
      isSuccess,
      androidLink: process.env.FITAPP_ANDROID_LINK,
      iOSLink: process.env.FITAPP_IOS_LINK,
    });
  }

  private async renderTemplate(
    template: string,
    params: object = {},
  ): Promise<string> {
    return await renderFile(
      join(dirname(__filename), './web-templates', `${template}.template.ejs`),
      params,
    );
  }
}
