import styled from 'styled-components';
import { Typography, Button } from 'antd';

export const CardContainer = styled.div`
    width: 210px;
    border-radius: 10px;
    border: 1px solid #cc8d3e;
    overflow: hidden;
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 10px;
    padding-bottom: 0;
`;

export const CardContent = styled.div`
    padding: 5px;
    padding-top: 0;
`;

export const RewardText = styled(Typography.Text)`
    color: #cc8d3e;
    font-weight: bold;
    font-size: 16px;
    display: block;
    margin-bottom: 12px;
`;

export const ExpirationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ExpirationLabel = styled(Typography.Text)`
    color: #cc8d3e;
    font-size: 12px;
`;

export const ExpirationDate = styled(Typography.Text)`
    color: #2b2f2a;
    font-weight: bold;
    font-size: 14px;
`;

// Estilo do botão de edição
export const EditButton = styled(Button)`
    background-color: #cc8d3e;
    border-color: #cc8d3e;
    color: #2b2f2a;

    &:hover {
        background-color: #b87d35;
        border-color: #b87d35;
    }
`;
