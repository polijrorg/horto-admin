import { ICoupon } from './Coupons';
import { IAddress, IAddressRequest } from './Address';

export interface Company {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    subscriptionPlan: string;
    branch: string;
    planExpirationDate: string;
    address: IAddress;
    coupons: ICoupon[];
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
    address: IAddressRequest;
}
