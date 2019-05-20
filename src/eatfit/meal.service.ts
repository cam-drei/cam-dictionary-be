import { Injectable, Inject } from '@nestjs/common';
import { Meal, AddMealInput, UpdateMealInput } from 'src/graphql.schema';
import { IUser } from 'src/user/schemas/user.schema';
import { IMeal } from './schemas/meal.schema';
import { Model, mongo } from 'mongoose';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class MealService {
  constructor(@Inject('Meal') private readonly MealModel: Model<IMeal>) {}

  public async addMeal(user: IUser, meal: AddMealInput): Promise<Meal> {
    const attrs = {
      user,
      ...meal,
      time: new Date(meal.time),
    };

    const mealDoc = new this.MealModel(attrs);
    await mealDoc.save();

    return mealDoc.toGraphObject();
  }

  public async updateMeal(user: IUser, meal: UpdateMealInput): Promise<Meal> {
    const attrs: any = {
      user,
      ...meal,
    };
    if (meal.time) {
      attrs.time = new Date(meal.time);
    }

    const _id = new mongo.ObjectId(meal.id);
    const doc = await this.MealModel.findOne({ _id });
    doc.set(attrs);

    await doc.save();

    return doc.toGraphObject();
  }

  public async removeMeal(id: string): Promise<boolean> {
    const _id = new mongo.ObjectId(id);
    const doc = await this.MealModel.findOne({ _id });

    if (!doc) {
      return false;
    }

    doc.remove();
    return true;
  }

  public async getMealsByDate(user: IUser, time: number): Promise<Meal[]> {
    const docs = await this.MealModel.find({
      user,
      time: {
        $gte: moment(time)
          .startOf('day')
          .toDate(),
        $lte: moment(time)
          .endOf('day')
          .toDate(),
      },
    });

    return _.map(docs, d => d.toGraphObject());
  }
}
