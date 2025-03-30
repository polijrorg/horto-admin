import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 24px;
    min-height: 360px;
    background-color: #f0f2f5; /* Cor de fundo padrão do Ant Design */
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 8px;
    margin-right: 16px;
`;

export const PlusIconWrapper = styled.div`
    font-size: 32px;
    color: #cc8d3e;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

export const CardsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap; /* Para garantir que os cards se ajustem em telas menores */
    gap: 20px; /* Espaçamento entre os cards */
`;
