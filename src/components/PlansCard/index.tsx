import React from 'react';
import { IPlan } from 'interfaces/Plans';
import { Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import * as S from './styles';

interface PlansCardProps {
    plan: IPlan;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const PlansCard: React.FC<PlansCardProps> = ({ plan, onEdit, onDelete }) => {
    return (
        <S.CardWrapper>
            <Card
                title={plan.name}
                bordered={false}
                headStyle={{ color: '#1890ff', fontWeight: 'bold' }}
                bodyStyle={{ paddingBottom: '12px' }}
            >
                <p>
                    <strong>Descrição:</strong> {plan.description}
                </p>
                <p>
                    <strong>Preço:</strong> R$ {plan.price.toFixed(2)}
                </p>
                <p>
                    <strong>Duração:</strong> {plan.duration} dias
                </p>
                <p>
                    <strong>Criado em:</strong>{' '}
                    {new Date(plan.createdAt).toLocaleDateString()}
                </p>
                <p>
                    <strong>Atualizado em:</strong>{' '}
                    {new Date(plan.updatedAt).toLocaleDateString()}
                </p>

                <S.ActionsWrapper>
                    <Space>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => onEdit(plan.id)}
                        >
                            Editar
                        </Button>
                        <Button
                            type="default"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => onDelete(plan.id)}
                        >
                            Deletar
                        </Button>
                    </Space>
                </S.ActionsWrapper>
            </Card>
        </S.CardWrapper>
    );
};

export default PlansCard;
