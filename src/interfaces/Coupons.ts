import { IPlan } from './Plans';
/* eslint-disable camelcase */
export interface ICoupon {
    id: string;
    name: string;
    couponType: 'BASIC' | 'PREMIUM';
    expirationDate: string;
    reward: string;
    payment: string;
    rules: string;
    active: boolean;
    created_at: string;
    companyId: string;
    acceptedPlans?: IPlan[];
}

export interface ICouponRequest {
    name: string;
    companyId: string;
    couponType: 'BASIC' | 'PREMIUM';
    expirationDate: string;
    reward: string;
    payment: string;
    rules: string;
    active: boolean;
    acceptedPlanIds?: string[];
}
