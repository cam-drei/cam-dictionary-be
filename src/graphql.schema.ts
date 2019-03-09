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
    birthday?: number;
    providerUid: string;
    providerAccessToken: string;
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
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

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
    birthday?: number;
    heightUnit?: string;
    heightValue?: number;
    weightUnit?: string;
    weightValue?: string;
    fitnessGoal?: string;
    provider: string;
    providerUid?: string;
    providerAccessToken?: string;
}
