import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonGroup = styled.div`
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
`;

export const RadioButton = styled.button<{ selected?: boolean }>`
    border-radius: 30px;
    padding: 0 20px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: none;
    cursor: pointer;
    outline: none;
    width: 120px;
    background-color: ${({ selected }) => (selected ? '#CC8D3E' : '#f5f5f5')};
    color: ${({ selected }) => (selected ? 'white' : 'black')};

    &:hover {
        opacity: 0.8;
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #fcfcfc;
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 56px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
    margin-bottom: 24px;
    font-size: 24px;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ConfirmButton = styled(Button)`
    width: 100%;
    max-width: 300px;
    border-radius: 50px;
    background-color: #cc8d3e;
    border-color: #cc8d3e;
    font-weight: bold;

    &:hover {
        background-color: #b87d35 !important;
        border-color: #b87d35 !important;
    }
`;
