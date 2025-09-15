'use client';

import React, { useState, useEffect } from 'react';
import { Spin, Alert, message } from 'antd';
import useAuth from 'hooks/useAuth';
import PlanService from 'services/PlansService';
import { IPlan, ISubscribeRequest } from 'interfaces/Plans';
import CompanyPlanCard from 'components/CompanyPlansCards';
import * as S from './styles';

const PlansPage: React.FC = () => {
    const { user } = useAuth();
    const [plans, setPlans] = useState<IPlan[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await PlanService.GetAll();
                setPlans(data);
            } catch (err) {
                console.error('Failed to fetch plans:', err);
                setError(
                    'Não foi possível carregar os planos. Tente novamente mais tarde.'
                );
                message.error('Não foi possível carregar os planos.'); // Mensagem de erro do Ant Design
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleSubscribe = async (planId: string) => {
        if (!user || !user.id || !user.email) {
            message.warning('Por favor, faça login para adquirir um plano.');
            return;
        }

        try {
            const subscribeData: ISubscribeRequest = {
                entityType: 'company',
                entityId: user.id,
                email: user.email,
                planId,
                back_url: `${window.location.origin}/plans`
            };

            const response = await PlanService.SubscribeToPlan(subscribeData);
            if (response?.checkoutUrl) {
                window.open(response.checkoutUrl, '_blank');
            } else {
                message.error('URL de checkout inválida.');
            }
        } catch (err) {
            console.error('Subscription error:', err);
            message.error('Não foi possível iniciar a assinatura.');
        }
    };

    if (loading) {
        return (
            <S.Container>
                <Spin size="large" tip="Carregando planos..." />
            </S.Container>
        );
    }

    if (error) {
        return (
            <S.Container>
                <Alert
                    message="Erro"
                    description={error}
                    type="error"
                    showIcon
                />
            </S.Container>
        );
    }

    return (
        <S.Container>
            <S.Title>Escolha seu plano</S.Title>
            <S.CardsContainer>
                {plans.map((plan) => (
                    <CompanyPlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribe}
                    />
                ))}
            </S.CardsContainer>
        </S.Container>
    );
};

export default PlansPage;
