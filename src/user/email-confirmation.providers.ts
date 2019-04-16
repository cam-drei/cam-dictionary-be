import { Connection } from 'mongoose';
import { EmailConfirmationSchema } from './schemas/email-confirmation.schema';

export const emailConfirmationProviders = [
  {
    provide: 'EmailConfirmation',
    useFactory: (connection: Connection) =>
      connection.model('EmailConfirmation', EmailConfirmationSchema),
    inject: ['DbConnectionToken'],
  },
];
