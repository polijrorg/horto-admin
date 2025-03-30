/* eslint-disable camelcase */
export interface Coupon {
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
}
