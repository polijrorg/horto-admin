import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const Title = styled.h1`
    font-size: 2rem;
    color: black;
`;

export const LeftSide = styled.div`
    height: 100%;
    width: 45%;
`;

export const RightSide = styled.div`
    height: 100%;
    width: 55%;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Banner = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const FormTitle = styled.h2`
    color: #212529;
    font-size: 40px;
    margin-bottom: 48px;
`;
