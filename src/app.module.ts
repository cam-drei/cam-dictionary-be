import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { WorkoutModule } from './workout/workout.module';
import { EatFitModule } from './eatfit/eatfit.module';
import { WebModule } from './web/web.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
        outputAs: 'class',
      },
      context: ({ req }) => ({ req }),
    }),
    CatsModule,
  ],
})
export class ApplicationModule {}
