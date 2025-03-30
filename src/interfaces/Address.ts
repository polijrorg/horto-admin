export interface IAddress {
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

export interface IAddressRequest {
    street: string;
    numberHouse: number;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
}

export const defaultAddress: IAddressRequest = {
    street: '',
    numberHouse: 0,
    neighborhood: '',
    city: '',
    state: '',
    cep: ''
};
