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

export class UpdateUserInput {
    name?: string;
    email?: string;
    gender?: string;
    birthday?: string;
    heightUnit?: string;
    heightValue?: number;
    weightUnit?: string;
    weightValue?: number;
    fitnessGoal?: string;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract loginByFacebook(params?: SocialLoginInput): User | Promise<User>;

    abstract loginByGoogle(params?: SocialLoginInput): User | Promise<User>;

    abstract sendPasswordToPhone(params?: SendPasswordToPhoneInput): User | Promise<User>;

    abstract loginByPhone(params?: PhoneLoginInput): User | Promise<User>;

    abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;

    abstract updateUser(user?: UpdateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

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
}
