import { AxiosResponse } from 'axios';
import { Coupon, ICouponRequest } from 'interfaces/Coupons';
import api from './api';

export default class CouponServices {
    static async create(data: ICouponRequest): Promise<ICouponRequest> {
        const response: AxiosResponse<ICouponRequest> = await api.post(
            '/coupons/create',
            data
        );
        return response.data;
    }

    static async update({
        data,
        couponId
    }: {
        data: ICouponRequest;
        couponId: string;
    }): Promise<UpdateRequest> {
        const response: AxiosResponse<UpdateRequest> = await api.patch(
            `/coupons/update/${couponId}`,
            {
                name: data.name,
                couponType: data.couponType,
                expirationDate: data.expirationDate,
                reward: data.reward,
                payment: data.payment,
                rules: data.rules,
                active: data.active
            }
        );
        return response.data;
    }

    static async getCouponById(couponId: string): Promise<Coupon> {
        try {
            const response: AxiosResponse<Coupon> = await api.get(
                `/coupons/getById/${couponId}`
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async delete(couponId: string): Promise<void> {
        await api.delete(`/coupons/delete/${couponId}`);
    }
}
