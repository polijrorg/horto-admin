export interface Address {
    id: string;
    street: string;
    numberHouse: number;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
    companyId?: string;
    userId?: string | null;
}

export interface AddressRequest {
    street: string;
    numberHouse: number;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
}
