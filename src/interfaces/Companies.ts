import { Coupon } from './Coupons';
import { Address, AddressRequest } from './Address';

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
    password: string;
    image: File | null;
    subscriptionPlan: string;
    branch: string;
    planExpirationDate: string;
    address: AddressRequest;
}
