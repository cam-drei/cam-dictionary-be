import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        process.env.MONGODB_URI,
        {
          useFindAndModify: false,
          useNewUrlParser: true,
          useCreateIndex: true,
        },
      ),
  },
];
