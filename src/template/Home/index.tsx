import React from 'react';
import { Card } from 'antd';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import * as S from './styles';

const HomePage = () => {
    const router = useRouter();

    // Função para navegar para outras páginas
    const navigateToPage = (key: string) => {
        router.push(key);
    };

    // Verifica se o usuário é um administrador
    const { userType, user } = useAuth();
    const isAdmin = userType === 'adm';

    return (
        <S.LayoutBackground>
            <h2>{isAdmin ? 'Área do Administrador' : 'Área Empresarial'}</h2>
            <S.CardContainer>
                {isAdmin ? (
                    // Cards para administrador
                    <>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="Icone para aba de clientes"
                                        src="assets/icons/data_visualiation_graph.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Users')}
                        >
                            <Card.Meta title="Análise de Usuário" />
                        </S.StyledCard>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="Icone para aba de empresas"
                                        src="assets/icons/management.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Companies')}
                        >
                            <Card.Meta title="Gerenciar Empresas" />
                        </S.StyledCard>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="Icone para a aba de eventos"
                                        src="assets/icons/events.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Events')}
                        >
                            <Card.Meta title="Gerenciar Eventos" />
                        </S.StyledCard>
                        <S.StyledCard
                            hoverable
                            style={{ width: '300px' }}
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="icone para aba de posts"
                                        src="assets/icons/Story.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Posts')}
                        >
                            <Card.Meta title="Gerenciar Posts" />
                        </S.StyledCard>
                    </>
                ) : (
                    // Cards para empresa
                    <>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="icone para a aba de usuarios"
                                        src="assets/icons/data_visualiation_graph.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Users')}
                        >
                            <Card.Meta title="Análise de Clientes" />
                        </S.StyledCard>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="icone para a aba de novo cupom"
                                        src="assets/icons/mdi_coupon.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() =>
                                router.push({
                                    pathname: '/Coupons',
                                    query: { companyId: user?.id }
                                })
                            }
                        >
                            <Card.Meta title="Solicitar inclusão de Novo Cupom" />
                        </S.StyledCard>
                        <S.StyledCard
                            hoverable
                            cover={
                                <S.CardImageContainer>
                                    <S.CardImage
                                        alt="icone para aba de planos"
                                        src="assets/icons/benefits-welfare.svg"
                                    />
                                </S.CardImageContainer>
                            }
                            onClick={() => navigateToPage('Plans')}
                        >
                            <Card.Meta title="Plano e Benefícios" />
                        </S.StyledCard>
                    </>
                )}
            </S.CardContainer>
        </S.LayoutBackground>
    );
};

export default HomePage;
