import { AxiosResponse } from 'axios';
import {
    IPlan,
    IPlanRequest,
    ISubscribeRequest,
    ISubscribeResponse
} from 'interfaces/Plans';
import api from './api';

export default class PlanService {
    static async GetAll(): Promise<IPlan[]> {
        const response: AxiosResponse<IPlan[]> = await api.get('/plans');
        return response.data;
    }

    static async GetPlanById(planId: string): Promise<IPlan> {
        const response: AxiosResponse<IPlan> = await api.get(
            `/plans/${planId}`
        );
        return response.data;
    }

    static async CreatePlan(data: IPlanRequest): Promise<IPlan> {
        const response: AxiosResponse<IPlan> = await api.post('/plans', data);
        return response.data;
    }

    static async UpdatePlan(
        planId: string,
        data: IPlanRequest
    ): Promise<IPlan> {
        const response: AxiosResponse<IPlan> = await api.patch(
            `/plans/${planId}`,
            data
        );
        return response.data;
    }

    static async DeletePlan(planId: string): Promise<void> {
        await api.delete(`/plans/${planId}`);
    }

    static async SubscribeToPlan(
        data: ISubscribeRequest
    ): Promise<ISubscribeResponse> {
        const response: AxiosResponse = await api.post(
            '/payments/subscribe',
            data
        );
        return response.data;
    }
}
