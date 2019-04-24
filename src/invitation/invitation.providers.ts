import { Connection } from 'mongoose';
import { InvitationSchema } from './schemas/invitation.schema';

export const invitationProviders = [
  {
    provide: 'Invitation',
    useFactory: (connection: Connection) =>
      connection.model('Invitation', InvitationSchema),
    inject: ['DbConnectionToken'],
  },
];
