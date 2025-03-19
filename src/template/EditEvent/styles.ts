import styled from 'styled-components';
import { Button, Typography } from 'antd';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Alterado para alinhar no topo */
    padding: 10px; /* Adicionado padding para evitar que o conteúdo encoste nas bordas */
`;

export const FormContainer = styled.div`
    background-color: #fff;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    max-height: 80vh; /* Limita a altura máxima do formulário */
    overflow-y: auto; /* Adiciona rolagem vertical caso o conteúdo seja muito grande */
`;

export const Title = styled(Typography.Title)`
    text-align: center;
    margin-bottom: 16px !important; /* Reduzido o espaçamento inferior */
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px; /* Reduzido o espaçamento entre os elementos */
`;

export const ConfirmButton = styled(Button)`
    width: 100%;
    background-color: #cc8d3e;
    border-color: #cc8d3e;

    &:hover {
        background-color: #b87d35 !important;
        border-color: #b87d35 !important;
    }
`;
