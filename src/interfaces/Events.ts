/* eslint-disable camelcase */
import { IAddress, IAddressRequest } from './Address';

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
    participants: IParticipants[];
    address?: IAddress;
    linkImage?: string;
}

export interface IEventRequest {
    name: string;
    companyName: string;
    eventType: string;
    eventStartDate: string;
    eventEndDate: string;
    reward: string;
    rules: string;
    image: File | null;
    link: string;
    active: boolean;
    address?: IAddressRequest;
}

interface IParticipants {
    id: string;
    userId: string;
    eventId: string;
    createdAt: string;
}

export interface GetParticipantsResponse {
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
