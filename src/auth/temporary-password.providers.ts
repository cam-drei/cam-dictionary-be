import { Connection } from 'mongoose';
import { TemporaryPasswordSchema } from './schemas/temporary-password.schema';

export const temporaryPasswordProviders = [
  {
    provide: 'TemporaryPassword',
    useFactory: (connection: Connection) => connection.model('TemporaryPassword', TemporaryPasswordSchema),
    inject: ['DbConnectionToken'],
  },
];