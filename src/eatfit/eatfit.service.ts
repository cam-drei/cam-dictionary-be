import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { EatFit, Meal } from 'src/graphql.schema';
import { IUser, FITNESS_GOAL, GENDER, BODY_FAT } from 'src/user/schemas/user.schema';

const PROTEIN_MULTIPLIER = 1;
const FAT_MULTIPLIER = 0.25;

const standardValues = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75];

@Injectable()
export class EatFitService {
  constructor() {}

  public async generateEatFit(user: IUser): Promise<EatFit> {
    const carbs = this.carbs(user);
    const fat = this.fat(user);
    const protein = this.protein(user);

    const total = carbs + fat + protein;

    const proteinRate = await this.closest(standardValues, protein / total);
    const carbsRate = await this.closest(standardValues, carbs / total);
    const fatRate = 1 - proteinRate - carbsRate;

    const result: EatFit = {
      carbs: carbsRate,
      fat: fatRate,
      protein: proteinRate,
      meals: this.generateMeals(user),
    };
    return result;
  }

  private generateMeals(user: IUser): Meal[] {
    const TDEE = this.TDEE(user);
    const breakfast = Math.floor(TDEE * 0.2);
    const lunch = Math.floor(TDEE * 0.35);
    const diner = Math.floor(TDEE * 0.45);

    return [
      { calories: breakfast, name: 'Breakfast', time: '8:00' },
      { calories: lunch, name: 'Lunch', time: '13:00' },
      { calories: diner, name: 'Dinner', time: '18:30' },
    ];
  }

  private goal(user: IUser): number {
    if (user.fitnessGoal === FITNESS_GOAL.LOSE) {
      return 0.2;
    } else if (user.fitnessGoal === FITNESS_GOAL.STAY) {
      return 0;
    } else if (user.fitnessGoal === FITNESS_GOAL.GAIN) {
      return -0.2;
    } else {
      return 0;
    }
  }

  private BMR(user: IUser): number {
    let BMRConst = 5;
    const BMRGoal = this.goal(user);

    if (user.gender === GENDER.FEMALE) {
      BMRConst = -161;
    } else if (user.gender === GENDER.MALE) {
      BMRConst = 5;
    }

    return (
      (10 * user.weightInKG +
        (6.25 * user.heightInCM) / 2.54 -
        5 * user.ageInYear +
        BMRConst) *
      BMRGoal
    );
  }

  private LBM(user: IUser): number {
    return (1 - (user.bodyFat / 100)) * user.weightInKG;
  }

  private RMR(user: IUser): number {
    return (370 + 21.6 * this.LBM(user)) * (1 - this.goal(user)) * user.pal;
  }

  private TDEE(user: IUser): number {
    const { pal } = user;
    if (user.bodyFat !== BODY_FAT.NOT_SURE) {
      return pal * this.RMR(user);
    } else {
      return pal * this.BMR(user);
    }
  }

  private BMI(user: IUser): number {
    return (user.weightInKG / (user.heightInCM * user.heightInCM)) * 10000;
  }

  private protein(user: IUser): number {
    return user.weightInKG * PROTEIN_MULTIPLIER;
  }

  private fat(user: IUser): number {
    if (BODY_FAT) {
      return (this.RMR(user) * FAT_MULTIPLIER) / 4;
    } else {
      return (this.TDEE(user) * FAT_MULTIPLIER) / 4;
    }
  }

  private carbs(user: IUser): number {
    return (this.TDEE(user) - this.protein(user) - this.fat(user)) / 4 / 3;
  }

  private closest(array, goal): Promise<number> {
    const promise = new Promise<number>((resolve, reject) => {
      array.reduce((prev, curr) => {
        resolve(Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
      });
    });

    return promise;
  }
}
