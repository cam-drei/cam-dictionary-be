/* tslint:disable */
export class AddMealInput {
    type: string;
    calories: number;
    time: number;
    isDone?: boolean;
}

export class CreateCatInput {
    name?: string;
    age?: number;
}

export class PhoneLoginInput {
    phone: string;
    password: string;
}

export class SendPasswordToPhoneInput {
    phone: string;
}

export class SocialLoginInput {
    phone?: string;
    name: string;
    email?: string;
    gender?: string;
    birthday?: string;
    providerUid: string;
    providerAccessToken: string;
    provider?: string;
}

export class UpdateMealInput {
    id: string;
    type?: string;
    calories?: number;
    time?: number;
    isDone?: boolean;
}

export class UpdateUserInput {
    name?: string;
    email?: string;
    displayName?: string;
    gender?: string;
    birthday?: string;
    heightUnit?: string;
    heightValue?: number;
    weightUnit?: string;
    weightValue?: number;
    fitnessGoal?: string;
    isAcceptAgreement?: boolean;
    bodyFat?: number;
    pal?: number;
    waistSize?: number;
}

export class WorkoutGeneratorInput {
    duration: string;
    intensity: string;
    class: string;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export class EatFit {
    carbs: number;
    fat: number;
    protein: number;
    totalCalories: number;
}

export class Meal {
    id: string;
    type: string;
    calories: number;
    time: number;
    isDone: boolean;
}

export abstract class IMutation {
    abstract loginByFacebook(params?: SocialLoginInput): User | Promise<User>;

    abstract loginByGoogle(params?: SocialLoginInput): User | Promise<User>;

    abstract sendPasswordToPhone(params?: SendPasswordToPhoneInput): User | Promise<User>;

    abstract loginByPhone(params?: PhoneLoginInput): User | Promise<User>;

    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract addMeal(meal: AddMealInput): Meal | Promise<Meal>;

    abstract updateMeal(meal: UpdateMealInput): Meal | Promise<Meal>;

    abstract removeMeal(id: string): boolean | Promise<boolean>;

    abstract generateInvitationLink(method: string): string | Promise<string>;

    abstract sendInvitationEmail(toEmails: string[]): boolean | Promise<boolean>;

    abstract updateUser(user?: UpdateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract generateEatFit(): EatFit | Promise<EatFit>;

    abstract meals(time: number): Meal[] | Promise<Meal[]>;

    abstract generateWorkout(params?: WorkoutGeneratorInput): WorkoutGeneratorResultItem[] | Promise<WorkoutGeneratorResultItem[]>;

    abstract user(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract catCreated(): Cat | Promise<Cat>;
}

export class User {
    id: string;
    phone?: string;
    name?: string;
    email?: string;
    displayName?: string;
    gender?: string;
    birthday?: string;
    heightUnit?: string;
    heightValue?: number;
    weightUnit?: string;
    weightValue?: number;
    fitnessGoal?: string;
    provider: string;
    providerUid?: string;
    providerAccessToken?: string;
    accessToken?: string;
    isAcceptAgreement?: boolean;
    emailConfirmed?: boolean;
    bodyFat?: number;
    pal?: number;
    bmiIndex?: number;
    wsrIndex?: number;
    waistSize?: number;
}

export class Workout {
    id?: string;
    index?: string;
    workouts?: string;
    muscleGroup?: string;
    class?: string;
    duration?: string;
    targetBMI?: string;
    equipment?: string;
    heartRate?: string;
    medium?: string;
    intensity?: string;
}

export class WorkoutGeneratorResultItem {
    warmup?: Workout;
    main?: Workout;
    coolDown?: Workout;
}
