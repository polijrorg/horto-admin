/* eslint-disable camelcase */

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
