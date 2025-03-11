import styled from 'styled-components';
import { Card } from 'antd';

export const LayoutBackground = styled.div`
    padding: 24px;
    min-height: 360px;
`;

export const CardContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-around;
    margin-top: 20px;
`;

export const StyledCard = styled(Card)`
    text-align: center;
`;

export const CardImageContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const CardImage = styled.img`
    width: 64px;
    height: 64px;
    margin: 16px;
    color: #c47f38;
`;
