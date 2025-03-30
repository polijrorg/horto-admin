import styled from 'styled-components';

export const PageContainer = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
        color: #333;
        font-size: 24px;
        margin: 0;
    }
`;

export const SectionContainer = styled.div`
    margin-bottom: 32px;

    h3 {
        color: #444;
        font-size: 18px;
        margin-bottom: 16px;
    }
`;

export const NoCouponsMessage = styled.div`
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
    text-align: center;
    color: #666;
`;

export const TablesContainer = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
`;

export const UserInfoContainer = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const Description = styled.div`
    display: flex;
    margin-bottom: 12px;
    align-items: center;
`;

export const TitleContainer = styled.div`
    min-width: 150px;
`;

export const Title = styled.span`
    font-weight: 600;
    color: #555;
`;
