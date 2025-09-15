import styled from 'styled-components';

export const CardWrapper = styled.div`
    width: 320px;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const ActionsWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: center;
`;
