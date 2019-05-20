import { Connection } from 'mongoose';
import { MealSchema } from './schemas/meal.schema';

export const mealProviders = [
  {
    provide: 'Meal',
    useFactory: (connection: Connection) =>
      connection.model('Meal', MealSchema),
    inject: ['DbConnectionToken'],
  },
];
