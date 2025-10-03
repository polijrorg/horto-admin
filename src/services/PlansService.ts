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

    static async CreatePlan(plan: IPlanRequest): Promise<IPlan> {
        const formData = new FormData();
        formData.append('name', plan.name);
        formData.append('description', plan.description);
        formData.append('price', plan.price.toString());
        formData.append('duration', plan.duration.toString());
        formData.append('checklist', plan.checklist);
        formData.append('subscriptionScope', plan.subscriptionScope);

        // A interface IPlanRequest agora espera um array de strings para o checklist
        if (plan.image) {
            formData.append('image', plan.image);
        }

        const response: AxiosResponse<IPlan> = await api.post(
            '/plans',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        return response.data;
    }

    static async UpdatePlan(
        planId: string,
        plan: IPlanRequest
    ): Promise<IPlan> {
        const formData = new FormData();
        formData.append('name', plan.name);
        formData.append('description', plan.description);
        formData.append('price', plan.price.toString());
        formData.append('duration', plan.duration.toString());
        formData.append('checklist', plan.checklist);
        formData.append('subscriptionScope', plan.subscriptionScope);

        if (plan.image) {
            formData.append('image', plan.image);
        }

        const response: AxiosResponse<IPlan> = await api.patch(
            `/plans/${planId}`,
            formData
        );

        return response.data;
    }

    static async DeletePlan(planId: string): Promise<void> {
        await api.delete(`/plans/${planId}`);
    }

    static async SubscribeToPlan(
        data: ISubscribeRequest
    ): Promise<ISubscribeResponse> {
        console.log('Subscribing to plan with data:', data);
        const response: AxiosResponse = await api.post(
            '/payments/subscribe',
            data
        );
        return response.data;
    }
}
