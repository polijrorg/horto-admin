import { AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';
import { ICouponRequest } from 'interfaces/Coupons';
import api from './api';

export default class CouponServices {
    static async create(data: ICouponRequest): Promise<ICouponRequest> {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response: AxiosResponse<ICouponRequest> = await api.post(
            '/coupons/create',
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }

    static async update(data: ICouponRequest): Promise<UpdateRequest> {
        const cookies = parseCookies();
        const token = cookies['@app:token'];
        const response: AxiosResponse<UpdateRequest> = await api.post(
            `/coupons/update/${data.id}`,
            {
                name: data.name,
                couponType: data.couponType,
                expirationDate: data.expirationDate,
                reward: data.reward,
                payment: data.payment,
                rules: data.rules,
                active: data.active
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    }
}
