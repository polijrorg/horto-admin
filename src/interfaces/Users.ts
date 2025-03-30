/* eslint-disable camelcase */
import { IAddress } from './Address';
import { ICoupon } from './Coupons';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    userImageLink: string;
    subscribePlan: string | null;
    typeUser: string;
    cardsId: any;
    created_at: string;
    address: IAddress;
    reedemedCoupons: ICoupon[];
    usedCoupons: ICoupon[];
}
