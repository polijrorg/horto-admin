/* eslint-disable camelcase */
import { Address, AddressRequest } from './Address';

export interface Event {
    id: string;
    name: string;
    companyName: string;
    eventType: string;
    eventStartDate: string;
    eventEndDate: string;
    reward: string;
    rules: string;
    link: string;
    active: boolean;
    address: Address;
}

export interface IEventRequest {
    name: string;
    companyName: string;
    eventType: string;
    eventStartDate: string;
    eventEndDate: string;
    reward: string;
    rules: string;
    link: string;
    active: boolean;
    address: AddressRequest;
}
