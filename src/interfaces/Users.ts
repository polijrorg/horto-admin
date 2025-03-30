/* eslint-disable camelcase */
import { IAddress, defaultAddress } from './Adress';
import { ICoupons } from './Coupons';

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
    reedemedCoupons: ICoupons[];
    usedCoupons: ICoupons[];
}

export const defaultUser: User = {
    name: '',
    email: '',
    password: '',
    age: 0,
    image: '',
    subscribePlan: '',
    typeUser: 'COMMON',
    cardsId: null,
    created_at: '',
    address: defaultAddress,
    reedemedCoupons: [],
    usedCoupons: []
};
