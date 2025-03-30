/* eslint-disable camelcase */

import { Address } from './Address';
import { Company } from './Companies';

export interface Administrator {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    administrator?: Administrator;
    company?: Company;
    token: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    image: string;
    subscribePlan: string;
    typeUser: 'COMMON' | 'ADMIN' | 'OTHER';
    cardsId: string | null;
    created_at: string;
    address: Address;
}
