import { Module } from '@nestjs/common';
import { EatFitService } from './eatfit.service';
import { EatFitResolvers } from './eatfit.resolvers';
import { MealService } from './meal.service';
import { mealProviders } from './meal.providers';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'bearer' }),
    UserModule,
  ],
  providers: [EatFitService, EatFitResolvers, MealService, ...mealProviders],
  exports: [EatFitService, MealService],
})
export class EatFitModule {}
