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
                {plan?.image && (
                    <img
                        src={plan.image}
                        alt={plan.name}
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
                <h3>R$ {plan.price.toFixed(2)}</h3>
                <p>Duração: {plan.duration} dias</p>
                <ul>
                    {plan.checklist
                        ?.split(';')
                        .sort((a, b) => {
                            // Sort by priority: 'v' (has) items first, then 'x' (doesn't have) items
                            const aHasFeature = a.trim().startsWith('v');
                            const bHasFeature = b.trim().startsWith('v');
                            if (aHasFeature && !bHasFeature) return -1;
                            if (!aHasFeature && bHasFeature) return 1;
                            return 0;
                        })
                        .map((item, index) => {
                            const trimmedItem = item.trim();
                            const hasFeature = trimmedItem.startsWith('v');
                            const text = trimmedItem.substring(1).trim();
                            const icon = hasFeature ? '✅' : '❌';
                            return (
                                <li
                                    key={index}
                                    style={{
                                        fontWeight: hasFeature
                                            ? 'bold'
                                            : 'normal'
                                    }}
                                >
                                    {icon} {text}
                                </li>
                            );
                        })}
                </ul>
            </S.CardContent>
            <S.StyledButton type="primary" onClick={() => onSubscribe(plan.id)}>
                ADQUIRIR PLANO
            </S.StyledButton>
        </S.StyledCard>
    );
};

export default CompanyPlanCard;
