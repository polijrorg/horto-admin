/* eslint-disable react/no-array-index-key */

import React from 'react';
import { IPlan } from 'interfaces/Plans';
import * as S from './styles';

interface CompanyPlanCardProps {
    plan: IPlan;
    onSubscribe: (planId: string) => void;
}

const CompanyPlanCard: React.FC<CompanyPlanCardProps> = ({
    plan,
    onSubscribe
}) => {
    return (
        <S.StyledCard
            hoverable
            cover={
                <S.CardHeader>
                    <h1>{plan.name}</h1>
                </S.CardHeader>
            }
        >
            <S.CardContent>
                <h3>R$ {plan.price.toFixed(2)}</h3>
                <p>Duração: {plan.duration} dias</p>
                <ul>
                    {plan.checklist?.split('@#@').map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
            </S.CardContent>
            <S.StyledButton type="primary" onClick={() => onSubscribe(plan.id)}>
                ADQUIRIR PLANO
            </S.StyledButton>
        </S.StyledCard>
    );
};

export default CompanyPlanCard;
