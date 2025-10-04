import styled from 'styled-components';
import { Card, Button } from 'antd';

export const StyledCard = styled(Card)`
    width: 300px;
    text-align: center;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    .ant-card-body {
        padding: 0;
    }
`;

export const CardHeader = styled.div`
    background-color: #f0f2f5;
    padding: 16px;
    h1 {
        font-weight: 500;
        margin: 0;
        color: #333;
    }
`;

export const CardContent = styled.div`
    padding: 24px;
    text-align: left;

    h3 {
        font-size: 24px;
        font-weight: bold;
        color: #1890ff; /* Cor azul para destacar o preço */
        margin-bottom: 8px;
    }

    p {
        font-size: 16px;
        color: #666;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-top: 16px;
    }

    li {
        font-size: 14px;
        color: #555;
        margin-bottom: 8px;
    }
`;

export const StyledButton = styled(Button)`
    margin-top: 24px;
    border-radius: 50px;
    font-weight: bold;
    height: 48px;
    width: 90%;
    margin-bottom: 24px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;
