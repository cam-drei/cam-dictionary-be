import { EatFitService } from './eatfit.service';
import { UseGuards, Logger } from '@nestjs/common';
import { Resolver, Args, Query, Mutation, Context } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/gqlauth.guard';
import { UserService } from '../user/user.service';
import { MealService } from './meal.service';
import {
  EatFit,
  AddMealInput,
  Meal,
  UpdateMealInput,
} from 'src/graphql.schema';

@Resolver('EatFit')
export class EatFitResolvers {
  private readonly logger = new Logger(EatFitResolvers.name);
  constructor(
    private readonly eatFitService: EatFitService,
    private readonly userService: UserService,
    private readonly mealService: MealService,
  ) {}

  @Query('generateEatFit')
  @UseGuards(GqlAuthGuard)
  async generateEatFit(@Context() context: any): Promise<EatFit> {
    this.logger.log('Generate eatFit');
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);
    return this.eatFitService.generateEatFit(userProfile);
  }

  @Query('meals')
  @UseGuards(GqlAuthGuard)
  async getMeals(
    @Context() context: any,
    @Args('time')
    time: number,
  ): Promise<Meal[]> {
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);

    return this.mealService.getMealsByDate(userProfile, time);
  }

  @Mutation('addMeal')
  @UseGuards(GqlAuthGuard)
  async addMeal(
    @Context() context: any,
    @Args('meal')
    meal: AddMealInput,
  ): Promise<Meal> {
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);

    return this.mealService.addMeal(userProfile, meal);
  }

  @Mutation('updateMeal')
  @UseGuards(GqlAuthGuard)
  async updateMeal(
    @Context() context: any,
    @Args('meal')
    meal: UpdateMealInput,
  ): Promise<Meal> {
    const { user } = context.req;
    const userProfile = await this.userService.getProfileById(user.id);

    return this.mealService.updateMeal(userProfile, meal);
  }

  @Mutation('removeMeal')
  @UseGuards(GqlAuthGuard)
  async removeMeal(@Args('id') id: string): Promise<boolean> {
    return this.mealService.removeMeal(id);
  }
}
