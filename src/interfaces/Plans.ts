/* eslint-disable camelcase */
export interface IPlan {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image?: string;
    checklist: string;
    createdAt: string;
    updatedAt: string;
    subscriptionScope: 'individual' | 'enterprise';
}

export interface IPlanRequest {
    name: string;
    description: string;
    price: number;
    duration: number;
    image?: File;
    subscriptionScope: 'individual' | 'enterprise';
    checklist: string; // Um array de strings que é passado para o backend como uma string separada por '@#@'
}

export interface ISubscribeRequest {
    entityType: 'user' | 'company';
    entityId: string;
    email: string;
    planId: string;
    back_url: string;
}

export interface ISubscribeResponse {
    checkoutUrl: string;
}
