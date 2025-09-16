/* eslint-disable camelcase */
import { IAddress } from './Address';
import { ICoupon } from './Coupons';
import { IPlan } from './Plans';

export type userTypeList = 'COMMON' | 'QRCODE';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    userImageLink: string;
    typeUser: userTypeList;
    cardsId: string[];
    created_at: string;
    planExpirationDate: string | null;
    planId: string | null;
    address: IAddress;
    plan: IPlan | null;
    reedemedCoupons: ICoupon[];
    usedCoupons: ICoupon[];
}
