import { AxiosResponse } from 'axios';
import {
    Event,
    IEventRequest,
    GetParticipantsResponse
} from 'interfaces/Events';
import api from './api';

export default class EventService {
    static async GetAll(): Promise<Event[]> {
        const response: AxiosResponse<Event[]> = await api.get(
            '/events/getAll'
        );

        return response.data;
    }

    static async GetEventById(EventId: string): Promise<Event> {
        const response: AxiosResponse<Event> = await api.get(
            `/events/getById/${EventId}`
        );

        return response.data;
    }

    static async CreateEvent(data: IEventRequest): Promise<Event> {
        const formData = new FormData();

        // Adiciona campos simples ao FormData
        formData.append('name', data.name);
        formData.append('companyName', data.companyName);
        formData.append('eventType', data.eventType);
        formData.append('eventStartDate', data.eventStartDate);
        formData.append('eventEndDate', data.eventEndDate);
        formData.append('reward', data.reward);
        formData.append('rules', data.rules);
        formData.append('link', data.link);
        formData.append('active', String(data.active));

        // Adiciona a imagem se existir
        if (data.image) {
            formData.append('image', data.image);
        }

        // Adiciona o endereço como JSON se existir
        if (data.address) {
            formData.append('address', JSON.stringify(data.address));
        }

        const response: AxiosResponse<Event> = await api.post(
            '/events/create',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    }

    static async UpdateEvent(
        EventId: string,
        data: IEventRequest
    ): Promise<Event> {
        const formData = new FormData();

        // Adiciona campos simples ao FormData
        formData.append('name', data.name);
        formData.append('companyName', data.companyName);
        formData.append('eventType', data.eventType);
        formData.append('eventStartDate', data.eventStartDate);
        formData.append('eventEndDate', data.eventEndDate);
        formData.append('reward', data.reward);
        formData.append('rules', data.rules);
        formData.append('link', data.link);
        formData.append('active', String(data.active));

        // Adiciona a imagem se existir
        if (data.image) {
            formData.append('image', data.image);
        }

        // Adiciona o endereço como JSON se existir
        if (data.address) {
            formData.append('address', JSON.stringify(data.address));
        }

        const response: AxiosResponse<Event> = await api.patch(
            `/events/update/${EventId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    }

    static async deleteEvent(id: string) {
        const response = await api.delete(`/events/delete/${id}`);
        return response.data;
    }

    static async GetParticipantsByEventId(
        eventId: string
    ): Promise<GetParticipantsResponse[]> {
        const response: AxiosResponse<GetParticipantsResponse[]> =
            await api.get(`/events/participants/${eventId}`);
        return response.data;
    }
}
