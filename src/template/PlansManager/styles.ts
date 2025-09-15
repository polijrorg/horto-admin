import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 24px;
    min-height: 360px;
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

export const SearchWrapper = styled.div`
    margin: 16px 0;
    max-width: 400px;
`;

export const CardsContainer = styled.div`
    display: flex;
    justify-content: left;
    margin-top: 20px;
    flex-wrap: wrap;
    gap: 20px;
`;
