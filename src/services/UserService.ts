import { AxiosResponse } from 'axios';

import AuthResponse from 'interfaces/Auth';
import { User } from 'interfaces/Users';
import { setCookie } from 'nookies';

import api from './api';

interface ILoginRequest {
    email: string;
    password: string;
}

export default class UserService {
    static async login(data: ILoginRequest): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await api.post(
            '/auth/login',
            data
        );

        setCookie(undefined, '@app:token', response.data.token);
        if (response.data.administrator) {
            setCookie(undefined, '@app:userId', response.data.administrator.id);
            setCookie(undefined, '@app:userType', 'adm');
        } else if (response.data.company) {
            setCookie(undefined, '@app:userId', response.data.company.id);
            setCookie(undefined, '@app:userType', 'company');
        }

        return response.data;
    }

    static async GetAll(): Promise<User[]> {
        const response: AxiosResponse<User[]> = await api.get('/users/getAll');

        return response.data;
    }

    static async GetUserById(userId: string): Promise<User> {
        const response: AxiosResponse<User> = await api.get(
            `/users/getById/${userId}`
        );

        return response.data;
    }
}
