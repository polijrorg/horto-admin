import { Coupon } from './Coupons';
import { Address } from './Address';

export interface Company {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    subscriptionPlan: string;
    branch: string;
    planExpirationDate: string;
    address: Address;
    coupons: Coupon[];
    linkImage: string;
}

export interface ICompanyRequest {
    name: string;
    email: string;
    image: File;
    subscriptionPlan: string;
    branch: string;
    planExpirationDate: string;
    address: {
        street: string;
        numberHouse: number;
        neighborhood: string;
        city: string;
        state: string;
        cep: string;
    };
}
