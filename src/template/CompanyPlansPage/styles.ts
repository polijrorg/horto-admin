import styled from 'styled-components';

export const Container = styled.div`
    padding: 24px;
    min-height: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.h2`
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 40px;
    color: #333;
`;

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;
