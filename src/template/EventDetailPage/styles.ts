import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 24px;
    background-color: #f5f5f5;
    min-height: 100vh;
`;

export const ContentWrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const EventImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    object-fit: cover;
`;

export const ParticipantsSection = styled.div`
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;
